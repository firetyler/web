import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MapRoomEntry} from "../../service/room-map.service";

@Injectable({
  providedIn: 'root'
})
export class QuanDataUpdateService {
  private dateFilter = new BehaviorSubject<number>(0);
  currentDateFilter = this.dateFilter.asObservable();
  numberOfDays = 0;
  entryArray: MapRoomEntry[] = []
  constructor() { }
  changeDateFilter(dateFilter: number) {
    this.dateFilter.next(dateFilter);
  }

  changeDate(dateFilter: number) {
    this.numberOfDays = dateFilter;
  }

  setArray(array:MapRoomEntry[]) {
    this.entryArray = [];
    this.entryArray = array;
  }
}
