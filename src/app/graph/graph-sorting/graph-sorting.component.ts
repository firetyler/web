import {Component, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";

@Component({
  selector: 'app-graph-sorting',
  templateUrl: './graph-sorting.component.html',
  styleUrls: ['./graph-sorting.component.css']
})
export class GraphSortingComponent implements OnInit {
  optionsList: string[] = ['Ingen sortering', 'Bokade timmar', 'Storlek', 'Bokningsbeteende', 'Bokningskostnad', 'Obokningskostnad'];
  sortOptions: string[] = ['Stigande', 'Minskande'];
  startArray: MapRoomEntry[] = [];
  isDecending: boolean;

  constructor(private mapRoom: RoomMapService) {
    this.isDecending = true;
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

      return sortedArray;
    } else if (option === 'Obokningskostnad') {

      return sortedArray;
    } else {
      return this.getUnsortedArray();
    }
  }

  onChange(value: any) {

  }
}
