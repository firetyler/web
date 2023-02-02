import {Injectable} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "./room-map.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for calculating the color for the behavior graph.
 */
export class BehaviorService {
  date: any;
  color: any;

  constructor() {
  }

  /**
   * Sets the color of each MapRoomEntry. One color is set for each day a room is used depending on how much the room is
   * used and if there is a bad booking behavior that specific day.
   * The bad behavior is calculated if the same course use one room before and after lunch and have a total booking time
   * less than or equal to four hours.
   *
   * @param booking, is one rooms bookings and properties for one day
   * @returns color, the color corresponding to the booking behavior. Blue for a minimum of 7 hours, Yellow for less than
   * 7 hours, Red for only bad behavior that day and orange if the day has a bad behavior but has other bookings
   */
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

  /**
   * Parses a string to military time
   * @param time, as a string
   * @returns number, the time in military style
   */
  getMilitaryTime(time: string): number {
    const militaryTime = time.replace(':', '');
    return parseInt(militaryTime);
  }
}


