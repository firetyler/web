import { Injectable } from '@angular/core';
import {ScheduleEntry} from "./schema.service";
import {CsvFileReaderService} from "./csv-file-reader.service";

@Injectable({
  providedIn: 'root'
})
export class Behavior2Service {
  private testScheduleEntry:any[] = [new ScheduleEntry("2012-01-01 08:00:00",
    "2012-01-01 10:00:00","11121","DVG002")];
  private roomBehavior : Behavior[] = [];
  constructor(private schedule : ScheduleEntry, private room : CsvFileReaderService) {
    const allRooms = room.getRooms();
    for(let i = 0 ; i < 6; i++) {
      if (this.testScheduleEntry[0].room === allRooms[i].id) {
        this.roomBehavior.push(new Behavior(allRooms[i].id, this.testScheduleEntry));
      }
    }
  }
}
export class Behavior {
  room : number;
  color : string = "";
  date : any;
  bookings : ScheduleEntry[];
  private dateError : boolean = false;
  private HOURS_OF_A_WORK_DAY = 8;

  constructor(room : number, bookings : ScheduleEntry[]) {
    this.room = room;
    this.setColor();
    this.setDate();
    this.bookings = bookings;
  }

  setColor(){
    let hasBadBehavior = false;
    let totalTime = 0;
    for (let i = 0; i < this.bookings.length; i++) {
      totalTime += this.bookings[i].getTotalHours();
    }
    for (let i = 0; i < this.bookings.length; i++) {
      if ((this.getMilitaryTime(this.bookings[i].startTime) < 1200 &&
        this.getMilitaryTime(this.bookings[i].startTime) > 930)){

      }
    }

    this.color = "#ff0000"
  }

  getMilitaryTime(time: string): number {
    const militaryTime = time.replace(':','');
    return parseInt(militaryTime);
  }

  setDate() {
    this.date = this.bookings[0].startDate;
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].startDate !== this.bookings[i].endDate) {
        this.dateError = true;
      } else if (this.date !== this.bookings[i].startDate){
        this.dateError = true;
      }
    }
    this.date = new Date(0,0,0);
  }
}
