import {Component, OnInit} from '@angular/core';
import {CsvFileReaderService} from '../../../service/csv-file-reader.service'
import {Location} from '@angular/common';


//https://mdbootstrap.com/docs/b4/angular/forms/search/
//https://stackoverflow.com/questions/53756451/angular-7-error-rangeerror-maximum-call-stack-size-exceeded
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  constructor(private roomService: CsvFileReaderService, private location: Location) {
  }

  show = false
  elementClicked = 'Click any of the list item below'
  searchText: any;
  dataset: any = [];
  pDataset: any = [];

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
      let tempId = data[i].id.toString().substring(0,2);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  async separateLevelFromArrayLevel() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      let tempId = data[i].id.toString().substring(0,2) + ':' + data[i].id.toString().substring(2,3);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  onClick(e: any) {
    this.elementClicked = 'Senast vald: ' + e.target.innerHTML;
    if (!this.pDataset.includes(e.target.innerHTML)) {
      this.pDataset.push(e.target.innerHTML)
    }
  }


  onClickRemove(i: number) {
    this.pDataset.splice(i, 1);
  }
}
