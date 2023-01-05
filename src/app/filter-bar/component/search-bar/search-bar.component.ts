import {Component} from '@angular/core';
import {CsvFileReaderService, Room} from '../../../service/csv-file-reader.service'
import * as Http from "http";
import {style} from "@angular/animations";
import {iterator} from "rxjs/internal/symbol/iterator";
import { Location } from '@angular/common';


//https://mdbootstrap.com/docs/b4/angular/forms/search/
//https://stackoverflow.com/questions/53756451/angular-7-error-rangeerror-maximum-call-stack-size-exceeded
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(private roomService: CsvFileReaderService,private location: Location) {
  }

  show = false
  elementClicked = 'Click any of the list item below'

  searchText: any;
  dataset: any = [];
  pDataset: any = [];

  ngOnInit() {
    if(this.location.path() == '/Akademi'){
      this.separateRoomsFromArrayAkademi();
    }
    if(this.location.path() == '/Hus'){
      this.separateRoomsFromArrayHus();
    }

  }


   async separateRoomsFromArrayAkademi() {
    let data = await this.roomService.getRooms();

     for(let i =0; i<data.length;i++){
       console.log(data[i]);
       if (!this.dataset.includes(data[i].academy)) {
         this.dataset.push(data[i].academy.toString())
       }
     }

  }

  async separateRoomsFromArrayHus() {
    let data = await this.roomService.getRooms();

    for(let i =0; i<data.length;i++){
      console.log(data[i]);
      if (!this.dataset.includes(data[i].id)) {
        this.dataset.push(data[i].id.toString())
      }
    }

  }

  // @ts-ignore
  onClick(e) {
    this.elementClicked = 'Last clicked: ' + e.target.innerHTML;
    if (!this.pDataset.includes(e.target.innerHTML)) {
      this.pDataset.push(e.target.innerHTML)
    }
  }

  onClickRemove(i: number) {
    this.pDataset.splice(i, 1);
  }

}

