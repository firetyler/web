import {Component, Injectable, Input, OnInit} from '@angular/core';
import {CsvFileReaderService} from '../../../service/csv-file-reader.service'
import {Location} from '@angular/common';
import {PriceGraphComponent} from "../../../graph/price-graph/price-graph.component";
import {MapRoomEntry, RoomMapService} from "../../../service/room-map.service";
import {BehaviorGraphComponent} from "../../../graph/behavior-graph/behavior-graph.component";
import {empty} from "rxjs";
import {MiniHeaderComponent} from "../../../mini-header/mini-header.component";


//https://mdbootstrap.com/docs/b4/angular/forms/search/
//https://stackoverflow.com/questions/53756451/angular-7-error-rangeerror-maximum-call-stack-size-exceeded
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  providers: []
})
@Injectable({
  providedIn: 'root'
})
export class SearchBarComponent implements OnInit {

  constructor(private roomService: CsvFileReaderService, private location: Location
    , private price: PriceGraphComponent, private mapRoom: RoomMapService,
              private behav: BehaviorGraphComponent, private mini: MiniHeaderComponent) {
  }

  show = false
  elementClicked = 'Click any of the list item below'
  searchText: any;
  dataset: any[] = [];
  pDataset: any[] = [];
  newData: any[] = [];


  ngOnInit() {
    if (this.location.path() == '/academy') {
      this.separateRoomsFromArrayAcademy();
    } else if (this.location.path() == '/room') {
      this.separateRoomsFromArrayRoom();
    } else if (this.location.path() == '/house') {
      this.separateHousesFromArrayHouse();
    } else if (this.location.path() == '/level') {
      this.separateLevelFromArrayLevel();
    }
  }

  async separateRoomsFromArrayAcademy() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      if (!this.dataset.includes(data[i].academy)) {
        this.dataset.push(data[i].academy.toString())
      }
    }
  }

  async separateRoomsFromArrayRoom() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      if (!this.dataset.includes(data[i].id)) {
        this.dataset.push(data[i].id.toString())
      }
    }

  }

  async separateHousesFromArrayHouse() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      let tempId = data[i].id.toString().substring(0, 2);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  async separateLevelFromArrayLevel() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      let tempId = data[i].id.toString().substring(0, 2) + ':' + data[i].id.toString().substring(2, 3);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  async onClick(e: any) {
    this.elementClicked = 'Senast vald: ' + e.target.innerHTML;
    if (!this.pDataset.includes(e.target.innerHTML)) {
      this.pDataset.push(e.target.innerHTML)
    }
    await this.getSet(this.pDataset)
    await this.geDataSet()

  }

  async getSet(p: any[]) {
    this.pDataset = p;
  }

  onClickRemove(i: number) {
    this.pDataset.splice(i, 1);
  }

  async geDataSet() {
    let temp = [this.pDataset];
    return temp;
  }

  async submitFunction() {
    await this.getForSort(await this.mapRoom.mapRooms(false));
  }

  async getForSort(json: MapRoomEntry[]) {

    console.log(await this.mini.getGraph());
    if (await this.mini.getGraph() == 'Användningskostnad') {
      for (let i = 0; i < json.length; i++) {
        for (let j = 0; j < this.pDataset.length; j++) {
          let level = json[i].id.toString().substring(0, 2) + ':' + json[i].id.toString().substring(2, 3);
          let house = json[i].id.toString().substring(0, 2);
          if (json[i].academy == this.pDataset[j] || json[i].id == this.pDataset[j]
            || level == this.pDataset[j] || house == this.pDataset[j]) {
            return await this.price.onclickPriceGraph(this.pDataset);
          }
        }
        if (this.pDataset.length == 0) {
          return await this.price.onclickPriceGraph(this.pDataset);
        }
      }
    } else if (await this.mini.getGraph() == 'Bokningsbeteende'){
     for (let i = 0; i < json.length; i++) {
       for (let j = 0; j < this.pDataset.length; j++) {
         let level = json[i].id.toString().substring(0, 2) + ':' + json[i].id.toString().substring(2, 3);
         let house = json[i].id.toString().substring(0, 2);
         if (json[i].academy == this.pDataset[j] || json[i].id == this.pDataset[j]
           || level == this.pDataset[j] || house == this.pDataset[j]) {
           return await this.behav.onclickBehavGraph(this.pDataset);
         }
       }
       if (this.pDataset.length == 0) {
         return await this.behav.onclickBehavGraph(this.pDataset);
       }
     }
   }
  }
}




