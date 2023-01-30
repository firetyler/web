import {Injectable} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "./room-map.service";

@Injectable({
  providedIn: 'root'
})

export class BehaviorService {
  date: any;
  color: any;

  constructor() {
  }

  setColor(booking: MapRoomEntry) {
    let hasBadBehavior = false;
    let totalTime = 0;
    let beforeLunch;
    let afterLunch;
    if(booking.entry.length == 0){
      return this.color = '#ffffff';
    }
    for (let i = 0; i < booking.entry.length; i++) {
      let startTime = this.getMilitaryTime(booking.entry[i].startTime);
      let endTime = this.getMilitaryTime(booking.entry[i].endTime);
      if (endTime > 114500 && endTime < 121500) {
        beforeLunch = booking.entry[i];
      } else if (startTime > 124500 && startTime < 133000) {
        afterLunch = booking.entry[i];
      }
    }

    if (beforeLunch != undefined && afterLunch != undefined) {
      if (beforeLunch.course === afterLunch.course) {
        if (beforeLunch.getTotalHours() + afterLunch.getTotalHours() <= 4) {
          hasBadBehavior = true;
        }
      }
    }
    totalTime += booking.getTotalHours();
    if (totalTime > 7 && !hasBadBehavior) {
      return this.color = '#0000ff';
    } else if (booking.entry.length == 2 && hasBadBehavior) {
      return this.color = "#ff0000";
    } else if (booking.entry.length > 2 && hasBadBehavior) {
      return this.color = '#ff8c00';
    } else {
      return this.color = '#ffff00';
    }
  }

  /*
    getColor() {
      console.log("hej från getColor");
      return this.setColor(this.bookings);
    }*/

  getMilitaryTime(time: string): number {
    const militaryTime = time.replace(':', '');
    return parseInt(militaryTime);
  }

  /* setDate(bookings: ScheduleEntry[]) {
     this.date = bookings[0].startDate;
     for (let i = 0; i < bookings.length; i++) {
       if (bookings[i].startDate !== bookings[i].endDate) {
         this.dateError = true;
       } else if (this.date !== bookings[i].startDate) {
         this.dateError = true;
       }
     }
     if (this.dateError) {
       this.date = new Date(0, 0, 0);
     } else {
       let split = bookings[0].startDate.split("-");
       this.date = new Date(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]));
     }

   }*/
}


