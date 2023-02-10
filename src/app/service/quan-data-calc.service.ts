import {Injectable} from '@angular/core';
import {BehaviorGraphComponent} from "../graph/behavior-graph/behavior-graph.component";
import {QuanDataUpdateService} from "../quanData/quan-data/quan-data-update.service";

@Injectable({
  providedIn: 'root'
})
/**
 * A service to calculate the booked hours in percentage and hours depending on if it's work hours or the campus opening
 * hours.
 */
export class QuanDataCalcService {

  constructor(private rooms: BehaviorGraphComponent, private filterService: QuanDataUpdateService) {}

  /**
   * Divides the booked hours with the total hours for a work week, 8-12 and 13-17 monday to friday
   * @param startDate
   * @param timePeriod
   * @returns percentage
   */
  getBookedWorkHoursPercentage(startDate: Date | undefined, timePeriod: number) {
    let percentage: number = 0;
    if (timePeriod == 7 || timePeriod == 30) {
      percentage = (this.getBookedWorkHours() / this.getTotalWorkHours(startDate, timePeriod)) * 100;
    }
    return percentage;
  }

  /**
   * Divides the booked hours with the total hours for the campus opened hours, 05-24 mon-sun
   * @param timePeriod
   * @returns percentage
   */
  getBookedHoursPercentage(timePeriod: number) {
    let percentage: number = 0;
    if (timePeriod == 7 || timePeriod == 30) {
      percentage = (this.getBookedHours() / this.getTotalHour(timePeriod)) * 100;
    }
    return percentage;
  }

  /**
   * Calculates the total amount of booked work hours for the array of rooms shown in the graphs
   * @returns hours
   */
  getBookedWorkHours() {
    let hours: number = 0;
    this.filterService.entryArray.forEach((roomMapEntry) => {
      hours += roomMapEntry.getTotalWorkHours();
    })
    return hours;
  }

  /**
   * Calculates the total amount of booked hours for the campus opened hours
   * @returns hours
   */
  getBookedHours() {
    let hours: number = 0;
    this.filterService.entryArray.forEach((roomMapEntry) => {
      hours += roomMapEntry.getTotalHours();
    })
    return hours;
  }

  /**
   * Calculates the amount of rooms from the chosen rooms. If no rooms are chosen by the filter the amount of rooms is
   * the amount of rooms in the CSV file
   * @private
   * @returns amountOfRooms
   */
  private getChosenRooms() {
    let amountOfRooms: number = 0;
    var roomArray: any[] = [];
    this.filterService.entryArray.forEach((roomMapEntry) => {
      if (!roomArray.includes(roomMapEntry.id)) {
        roomArray.push(roomMapEntry.id);
      }
    })
    amountOfRooms = roomArray.length;
    return amountOfRooms;
  }

  /**
   * Calculates the total amount of work hours that is available to book for the selected time period which is
   * depending on the start date
   * @param startDate
   * @param timePeriod
   * @returns hours*this.getChosenRooms()
   */
  getTotalWorkHours(startDate: Date | undefined, timePeriod: number) {
    let hours: number = 0;
    let curDate = startDate;
    if (curDate != undefined) {
      for (let i = 0; i < timePeriod; i++) {
        if (curDate.getDay() > 0 && curDate.getDay() < 6) {
          hours += 8;
        }
        curDate.setDate(curDate.getDate() + 1);
      }
    }
    return hours * this.getChosenRooms();
  }

  /**
   * Calculates the total amount of hours available to book for the 19 hours each day the campus is oped
   * @param timePeriod
   * @returns 19*timePeriod*this.getChosenRooms()
   */
  getTotalHour(timePeriod: number) {
    return 19 * timePeriod * this.getChosenRooms();
  }
}
