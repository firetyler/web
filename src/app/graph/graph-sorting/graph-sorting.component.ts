import {Component, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";

@Component({
  selector: 'app-graph-sorting',
  templateUrl: './graph-sorting.component.html',
  styleUrls: ['./graph-sorting.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'warn' },
  }]
})
export class GraphSortingComponent implements OnInit {
  optionsList: string[] = ['Ingen sortering', 'Bokade timmar', 'Storlek', 'Bokningsbeteende', 'Bokningskostnad', 'Obokningskostnad'];
  sortOptions: string[] = ['Stigande', 'Fallande'];
  startArray: MapRoomEntry[] = [];
  isWorkDay: boolean = false;
  private isDecending: boolean;

  constructor(private mapRoom: RoomMapService, private filterService: QuanDataUpdateService) {
    this.isDecending = true;
  }

  ngOnInit() {
    this.filterService.currentWorkDaysFilter.subscribe(isWorkDay =>{
      this.isWorkDay = isWorkDay;
    });
  }

  onSelect(option: string) {
    let sortedArray: MapRoomEntry[] = [];
    if (option === 'Bokade timmar') {
      if(this.isWorkDay) {
        sortedArray.sort((entryOne, entryTwo) => entryOne.getTotalWorkHours() - entryTwo.getTotalWorkHours());
      } else {
        sortedArray.sort((entryOne, entryTwo) => entryOne.getTotalHours() - entryTwo.getTotalHours());
      }
      if(!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else if (option === 'Storlek') {
      sortedArray.sort((entryOne, entryTwo) => entryOne.seats - entryTwo.seats);
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
      if(this.isWorkDay) {
        sortedArray.sort((entryOne, entryTwo) => entryOne.getTotalWorkHours()*entryOne.price - entryTwo.getTotalWorkHours()*entryTwo.price);
      } else {
        sortedArray.sort((entryOne, entryTwo) => entryOne.getTotalHours()*entryOne.price - entryTwo.getTotalHours()*entryTwo.price);
      }
      if (!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else if (option === 'Obokningskostnad') {
      if(this.isWorkDay) {
        sortedArray.sort((entryOne, entryTwo) => ((8-entryOne.getTotalWorkHours())*entryOne.price) - ((8-entryTwo.getTotalWorkHours())*entryTwo.price));
      } else {
        sortedArray.sort((entryOne, entryTwo) => ((19-entryOne.getTotalHours())*entryOne.price) - ((19-entryTwo.getTotalHours())*entryTwo.price));
      }
      if (!this.isDecending) {
        sortedArray.reverse();
      }
      return sortedArray;
    } else {
      return this.startArray;
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
