import { Injectable } from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Uses the schemaService to get all the rooms for the selected period
 */
export class GetScheduleDataService {
  private startDate: Date = new Date();
  private numberOfDays: number = 0;
  scheduleArray: ScheduleEntry[] = [];
  constructor(private getData: SchemaService) { }

  /**
   * Clears the scheduleArray to ensure the array is empty at the start. And saves the values of the startDate and
   * numberOfDays. Finally, it calls the method this.getSoapDataIterated
   * @param startDate,
   * @param numberOfDays
   */
  async fillArrayByTimePeriod(startDate: Date, numberOfDays: number) {
    this.scheduleArray=[];
    this.startDate = startDate;
    this.numberOfDays = numberOfDays;
    await this.getSoapDataIterated()
  }

  /**
   * Fills the array by systematically calling the schemaService for each day of the time period
   */
  async getSoapDataIterated() {
    const date = new Date();
    let count = 0;
    do {
      date.setFullYear(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()+count);
      let tempArray = await this.getData.getSoapData(date);
      tempArray.forEach((item) => this.scheduleArray.push(item));
      count++;
    } while (count < this.numberOfDays);
  }

  /**
   * If the scheduleArray is empty it send an alert to the user
   * @returns scheduleArray
   */
  async getScheduleArray() {
    if(this.scheduleArray.length < 1) {
      alert("Finns inget innehåll");
    }
    return this.scheduleArray;
  }
}
