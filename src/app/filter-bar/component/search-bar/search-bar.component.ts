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
    if (this.location.path() == '/Academy') {
      this.separateRoomsFromArrayAcademy();
    } else if (this.location.path() == '/Room') {
      this.separateRoomsFromArrayRoom();
    }
  }

  async separateRoomsFromArrayAcademy() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (!this.dataset.includes(data[i].academy)) {
        this.dataset.push(data[i].academy.toString())
      }
    }
  }

  async separateRoomsFromArrayRoom() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      if (!this.dataset.includes(data[i].id)) {
        this.dataset.push(data[i].id.toString())
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
