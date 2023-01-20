import {Component, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";

@Component({
  selector: 'app-graph-sorting',
  templateUrl: './graph-sorting.component.html',
  styleUrls: ['./graph-sorting.component.css']
})
export class GraphSortingComponent implements OnInit {
  optionsList: string[] = ['Ingen sortering', 'Bokade timmar', 'Storlek', 'Bokningsbeteende', 'Bokningskostnad', 'Obokningskostnad'];
  sortOptions: string[] = ['Stigande', 'Fallande'];
  calcOptions: string[] = ['Arbetstider', "Hela dygn"];
  startArray: MapRoomEntry[] = [];
  private isDecending: boolean;
  private isWorkDays: boolean;

  constructor(private mapRoom: RoomMapService) {
    this.isDecending = true;
    this.isWorkDays = true;
  }

  async ngOnInit() {
    this.startArray = await this.mapRoom.mapRooms();
  }

  getUnsortedArray() {
    return this.startArray;
  }

  onSelect(option: string) {
    let sortedArray: MapRoomEntry[] = [...this.startArray];
    if (option === 'Bokade timmar') {
      sortedArray.sort((entryOne,entryTwo) => {
        if (entryOne.getTotalHours() < entryTwo.getTotalHours()) {
          return -1;
        } else if (entryOne.getTotalHours() > entryTwo.getTotalHours()){
          return 1;
        } else {
          return 0;
        }
      });
      if(!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else if (option === 'Storlek') {
      sortedArray.sort((entryOne, entryTwo) => {
        if (entryOne.seats < entryTwo.seats) {
          return -1;
        } else if (entryOne.seats > entryTwo.seats) {
          return 1;
        } else {
          return 0;
        }
      });
      if (!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else if (option === 'Bokningsbeteende') {

      return sortedArray;
    } else if (option === 'Bokningskostnad') {
      sortedArray.sort((entryOne, entryTwo) => {
        if (!this.isWorkDays){
          if ((entryOne.getTotalHours() * entryOne.price) < (entryTwo.getTotalHours() * entryTwo.price)) {
            return -1;
          } else if ((entryOne.getTotalHours() * entryOne.price) > (entryTwo.getTotalHours() * entryTwo.price)) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if ((entryOne.getTotalWorkHours() * entryOne.price) < (entryTwo.getTotalWorkHours() * entryTwo.price)) {
            return -1;
          } else if ((entryOne.getTotalWorkHours() * entryOne.price) > (entryTwo.getTotalWorkHours() * entryTwo.price)) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      if (!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else if (option === 'Obokningskostnad') {
      sortedArray.sort((entryOne, entryTwo) => {
        if (!this.isWorkDays){
          if (((24-entryOne.getTotalHours()) * entryOne.price) < ((24-entryTwo.getTotalHours()) * entryTwo.price)) {
            return -1;
          } else if (((24-entryOne.getTotalHours()) * entryOne.price) > ((24-entryTwo.getTotalHours()) * entryTwo.price)) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (((8- entryOne.getTotalWorkHours()) * entryOne.price) < ((8-entryTwo.getTotalWorkHours()) * entryTwo.price)) {
            return -1;
          } else if (((8-entryOne.getTotalWorkHours()) * entryOne.price) > ((8-entryTwo.getTotalWorkHours()) * entryTwo.price)) {
            return 1;
          } else {
            return 0;
          }
        }
      });
      if (!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else {
      return this.getUnsortedArray();
    }
  }

  onChange(value: any) {
    if (value === 'Stigande') {
      this.isDecending = false;
    } else if (value === 'Fallande') {
      this.isDecending = true;
    }
  }

  onCalcSelect(time: string) {
    if (time === 'Arbetstider') {
      this.isWorkDays = true;
    } else if (time === "Hela dygn") {
      this.isWorkDays = false;
    }
  }
}
