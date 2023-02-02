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
/**
 * Search component for enable the user choose the rooms to be shown in the graphs
 */
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

  /**
   * Gets the different academies available from the CSV file and puts them in the list
   */
  async separateRoomsFromArrayAcademy() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      if (!this.dataset.includes(data[i].academy)) {
        this.dataset.push(data[i].academy.toString())
      }
    }
  }

  /**
   * Puts all the rooms in to the list
   */
  async separateRoomsFromArrayRoom() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      if (!this.dataset.includes(data[i].id)) {
        this.dataset.push(data[i].id.toString())
      }
    }
  }

  /**
   * Puts all the different houses in to the list
   * Based on the first two numbers in the room ID
   */
  async separateHousesFromArrayHouse() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      let tempId = data[i].id.toString().substring(0,2);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  /**
   * Puts all the different levels of each house in to the list
   * Based on the first two numbers on the room ID to get each house and the third number to get the level
   */
  async separateLevelFromArrayLevel() {
    let data = await this.roomService.getRooms();
    for (let i = 0; i < data.length; i++) {
      let tempId = data[i].id.toString().substring(0,2) + ':' + data[i].id.toString().substring(2,3);
      if (!this.dataset.includes(tempId)) {
        this.dataset.push(tempId);
      }
    }
  }

  /**
   * Called when an item in the search list and puts the item in to the selected list
   * @param e, the item clicked in the search list
   */
  onClick(e: any) {
    this.elementClicked = 'Senast vald: ' + e.target.innerHTML;
    if (!this.pDataset.includes(e.target.innerHTML)) {
      this.pDataset.push(e.target.innerHTML)
    }
  }

  /**
   * Removes an item from the list
   * @param i, the index of the item to be removed
   */
  onClickRemove(i: number) {
    this.pDataset.splice(i, 1);
  }
}
