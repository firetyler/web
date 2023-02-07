import {Injectable} from '@angular/core';
import {BehaviorGraphComponent} from "../graph/behavior-graph/behavior-graph.component";
import {QuanDataUpdateService} from "../quanData/quan-data/quan-data-update.service";

@Injectable({
  providedIn: 'root'
})
export class QuanDataCalcService {

  constructor(private rooms: BehaviorGraphComponent, private filterService: QuanDataUpdateService) {}

  getBookedWorkHoursPercentage(startDate: Date | undefined, timePeriod: number) {
    let percentage: number = 0;
    if (timePeriod == 7 || timePeriod == 30) {
      percentage = (this.getBookedWorkHours() / this.getTotalWorkHours(startDate, timePeriod)) * 100;
    }
    return percentage;
  }

  getBookedHoursPercentage(days: number) {
    let percentage: number = 0;
    if (days == 7 || days == 30) {
      percentage = (this.getBookedHours() / this.getTotalHour(days)) * 100;
    }
    return percentage;
  }

  getBookedWorkHours() {
    let hours: number = 0;
    this.filterService.entryArray.forEach((roomMapEntry) => {
      hours += roomMapEntry.getTotalWorkHours();
    })
    return hours;
  }

  getBookedHours() {
    let hours: number = 0;
    this.filterService.entryArray.forEach((roomMapEntry) => {
      hours += roomMapEntry.getTotalHours();
    })
    return hours;
  }

  private getChoosenRooms() {
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
    return hours * this.getChoosenRooms();
  }

  getTotalHour(days: number) {
    return (19 * days * this.getChoosenRooms());
  }
}
