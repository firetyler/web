import {Component, Injectable, OnChanges, OnInit} from '@angular/core';
import {CsvFileReaderService} from '../../../service/csv-file-reader.service'
import {Location} from '@angular/common';
import {ScheduleEntry} from "../../../service/schema.service";
import { MapRoomEntry, RoomMapService } from 'src/app/service/room-map.service';


//https://mdbootstrap.com/docs/b4/angular/forms/search/
//https://stackoverflow.com/questions/53756451/angular-7-error-rangeerror-maximum-call-stack-size-exceeded
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
@Injectable({
  providedIn: 'root'
})

export class SearchBarComponent implements OnChanges {
  constructor(private mapRoom: RoomMapService, private location: Location) {
  }


  show = false
  elementClicked = 'Click any of the list item below'
  searchText: any;
  dataset: any[] = [];
  //pDataset: any[] = [];
  pDataset: any[]=[];




  async ngOnChanges() {
    if (this.location.path() == '/academy') {
      this.separateRoomsFromArrayAcademy(await this.mapRoom.mapRooms(false));
    } else if (this.location.path() == '/room') {
      this.separateRoomsFromArrayRoom(await this.mapRoom.mapRooms(false));
    } else if (this.location.path() == '/house') {
      this.separateHousesFromArrayHouse(await this.mapRoom.mapRooms(false));
    } else if (this.location.path() == '/level') {
      this.separateLevelFromArrayLevel(await this.mapRoom.mapRooms(false));
    }

  }



  async separateRoomsFromArrayAcademy(json: MapRoomEntry[]) {
    
    for (let i = 0; i < json.length; i++) {
      if (!this.dataset.includes(json[i].academy)) {
        this.dataset.push(json[i].academy.toString())
      }
    }
  }

  async separateRoomsFromArrayRoom(json: MapRoomEntry[]) {
    for (let i = 0; i < json.length; i++) {
      if (!this.dataset.includes(json[i].id)) {
        this.dataset.push(json[i].id.toString())
      }
    }
  }

  async separateHousesFromArrayHouse(json: MapRoomEntry[]) {
    for (let i = 0; i < json.length; i++) {
      let tempId = json[i].id.toString().substring(0,2);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  async separateLevelFromArrayLevel(json: MapRoomEntry[]) {
    for (let i = 0; i < json.length; i++) {
      let tempId = json[i].id.toString().substring(0,2) + ':' + json[i].id.toString().substring(2,3);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

 async onClick(e: any) {
    // other options are e.target.innerText , e.target.className , or casting (e.target as HTMLInputElement).innerHTML
    if (!this.pDataset.includes((e.target as HTMLInputElement).innerHTML)) {
      this.elementClicked = 'Senast vald: ' + ((e.target as HTMLInputElement).innerHTML);
      this.pDataset.push(new SearchRoomEntry((e.target.innerHTML)));
      this.getPdataset()
    }
  }

 

  onClickRemove(i: number) {
    this.pDataset.splice(i, 1);
    console.log(this.pDataset);
  }

 async getPdataset(){
  console.log(this.pDataset[0].room);
    return this.pDataset;
  }
}

export class SearchRoomEntry {
  room: number;

  constructor(room: number) {
    this.room = room;
  }
}


export class SearchAcademyEntry {
   academy: string;

  constructor(academy: string) {
    this.academy = academy;
  }
}

export class SearchFloorEntry {
    floor: number;

  constructor(floor: number) {
    this.floor = floor;
  }
}

export class SearchHouseEntry {
  house: number;

constructor(house: number) {
  this.house = house;
}
}

