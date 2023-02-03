import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuanDataUpdateService {
  private dateFilter = new BehaviorSubject<number>(0);
  currentDateFilter = this.dateFilter.asObservable();
  constructor() { }
  changeDateFilter(dateFilter: number) {
    this.dateFilter.next(dateFilter);
  }
}
