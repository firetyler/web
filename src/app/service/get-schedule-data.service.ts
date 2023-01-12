import { Injectable } from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";

@Injectable({
  providedIn: 'root'
})
export class GetScheduleDataService {
  private startDate: Date = new Date();
  private numberOfDays: number = 0;
  scheduleArray: ScheduleEntry[] = [];
  constructor(private getData: SchemaService) { }

  setDates(startDate: Date, numberOfDays: number) {

    this.startDate = startDate;
    this.numberOfDays = numberOfDays;
    this.getSoapDataIterated()
  }

  async getSoapDataIterated() {
    const date = new Date();
    let count = 1;
    do {
      date.setFullYear(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+count);
      let tempArray = await this.getData.getSoapData(date);
      tempArray.forEach((item) => this.scheduleArray.push(item));
      count++;
    } while (count <= this.numberOfDays);
  }

  getScheduleArray() {
    return this.scheduleArray;
  }
}
