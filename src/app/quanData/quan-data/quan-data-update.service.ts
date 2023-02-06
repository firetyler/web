import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MapRoomEntry} from "../../service/room-map.service";

@Injectable({
  providedIn: 'root'
})
export class QuanDataUpdateService {
  private isWorkDayFilter = new BehaviorSubject<boolean>(false);
  currentWorkDaysFilter = this.isWorkDayFilter.asObservable();
  private dateFilter = new BehaviorSubject<number>(0);
  currentDateFilter = this.dateFilter.asObservable();
  numberOfDays = 0;
  entryArray: MapRoomEntry[] = []
  startDate: Date|undefined;
  private isWorkDay: boolean = false;
  constructor() { }
  changeDateFilter(dateFilter: number) {
    this.dateFilter.next(dateFilter);
  }

  changeDate(dateFilter: number) {
    this.numberOfDays = dateFilter;
  }
  changeIsWorkDay(isWorkDay: boolean) {
    this.isWorkDay = isWorkDay;
  }
  changeIsWorkDayFilter(isWorkDay: boolean) {
    this.isWorkDayFilter.next(isWorkDay);
  }

  setDate(startDate: Date|undefined) {
    this.startDate = startDate;
  }
  setArray(array:MapRoomEntry[]) {
    this.entryArray = [];
    this.entryArray = array;
  }
}
