import {Component, OnInit} from '@angular/core';
import {QuanDataCalcService} from "../../service/quan-data-calc.service";
import {QuanDataUpdateService} from "../quan-data/quan-data-update.service";
import {MapRoomEntry} from "../../service/room-map.service";
import {RoomFilterService} from "../../graph/room-filter.service";
import {RoomEntry} from "../../service/csv-file-reader.service";

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.css']
})
export class CostComponent implements OnInit{
  bookedCost: number = 0;
  unbookedCost: number = 0;
  isWorkDay: boolean = false;
  dateFilter: number = 0;
  dataArray: MapRoomEntry[] = [];
  unbookedArray: RoomEntry[] = [];
  constructor(private calc: QuanDataCalcService, private filterService: QuanDataUpdateService,
              private roomFilter: RoomFilterService) {}

  ngOnInit() {
    this.filterService.currentWorkDaysFilter.subscribe(isWorkDay =>{
      this.isWorkDay = isWorkDay;
      this.updateNumbers();
    });
    this.filterService.currentDateFilter.subscribe(dateFilter => {
      this.dateFilter = dateFilter;
      this.updateNumbers();
    })
    this.roomFilter.currentUnbookedRooms.subscribe(entries => {
      this.unbookedArray = entries;
      this.updateNumbers();
    })
  }

  updateNumbers() {
    this.dataArray = this.filterService.entryArray;
    this.unbookedCost = 0;
    this.bookedCost = 0;
    if(!this.isWorkDay) {
      this.dataArray.forEach((roomMapEntry) => {
        this.bookedCost += roomMapEntry.getTotalHours()*roomMapEntry.price;
        this.unbookedCost += (19-roomMapEntry.getTotalHours())*roomMapEntry.price;
      });
      this.unbookedArray.forEach((roomEntry) => {
        this.unbookedCost += (19*roomEntry.price);
      });
    } else {
      this.dataArray.forEach((roomMapEntry) => {
        this.bookedCost += roomMapEntry.getTotalWorkHours()*roomMapEntry.price;
        this.unbookedCost += (8-roomMapEntry.getTotalWorkHours())*roomMapEntry.price;
      });
      this.unbookedArray.forEach((roomEntry) => {
        this.unbookedCost += (8*roomEntry.price);
      });
    }
    this.bookedCost = Math.round(this.bookedCost);
    this.unbookedCost = Math.round(this.unbookedCost);
  }
}
