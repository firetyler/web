import {Component, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";

@Component({
  selector: 'app-graph-sorting',
  templateUrl: './graph-sorting.component.html',
  styleUrls: ['./graph-sorting.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'default' },
  }]
})
export class GraphSortingComponent implements OnInit {
  optionsList: string[] = ['Ingen sortering', 'Bokade timmar', 'Storlek', 'Bokningsbeteende', 'Bokningskostnad', 'Obokningskostnad'];
  sortOptions: string[] = ['Stigande', 'Fallande'];
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
      let filterBlueYellow = sortedArray.filter((entry) => entry.color === '#0000ff' || entry.color === '#ffff00');
      filterBlueYellow.sort((entryOne,entryTwo) => {
        if(entryOne.color === '#0000ff' && entryTwo.color === '#ffff00') {
          return 1;
        } else if (entryOne.color === '#ffff00' && entryTwo.color === '#0000ff') {
          return -1;
        } else {
          return 0;
        }
      });
      let filterOrangeRed = sortedArray.filter((entry) => entry.color === "#ff0000" || entry.color === '#ff8c00');
      filterOrangeRed.sort((entryOne,entryTwo) => {
        if(entryOne.color === '#ff8c00' && entryTwo.color === "#ff0000") {
          return 1;
        } else if (entryOne.color === "#ff0000" && entryTwo.color === '#ff8c00') {
          return -1;
        } else {
          return 0;
        }
      });
      filterOrangeRed.forEach((entry) => filterBlueYellow.push(entry));
      return filterBlueYellow;
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


}
