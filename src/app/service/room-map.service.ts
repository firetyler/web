import {Injectable} from '@angular/core';
import {CsvFileReaderService, RoomEntry} from "./csv-file-reader.service";
import {GetScheduleDataService} from "./get-schedule-data.service";
import {ScheduleEntry} from "./schema.service";
import {BehaviorService} from "./behavior.service";

@Injectable({
  providedIn: 'root'
})
/**
 * A service to map the rooms to the scheduleEntries from KronoX
 */
export class RoomMapService {
  listOfRooms: RoomEntry[] = [];
  listOfScheduleEntry: ScheduleEntry[] = [];
  listWithData: MapRoomEntry[] = [];
  listRoomsUnbooked: any[] = [];

  constructor(private csvReader: CsvFileReaderService, private getScheduleData: GetScheduleDataService,
              private behavior: BehaviorService) {}

  /**
   * Gets the list of all the rooms available and all the schedule entries collected from KronoX.
   * Then it creates an object for the room with the
   * @param hasDate if the object needs to be seperated by start date or not
   */
  async mapRooms(hasDate: Boolean) {
    this.listWithData = [];
    this.listOfRooms = await this.csvReader.getRooms();
    this.listOfScheduleEntry = await this.getScheduleData.getScheduleArray();
    this.listOfScheduleEntry.forEach((entry) => {
      let index: number;
      if(hasDate) {
        index = this.binarySearchWithDate(entry.room, entry.startDate, this.listWithData);
      } else {
        index = this.binarySearch(entry.room, this.listWithData)
      }
      if (index < 0) {
        let temp = this.listOfRooms.find((room) => room.id == entry.room);
        if (temp != undefined) {
          this.listWithData.push(new MapRoomEntry(temp.id, entry.startDate, entry.endDate, temp.academy,
            temp.seats, temp.price));
          this.listWithData[this.listWithData.length-1].entry.push(entry);
          this.listWithData.sort((entryA, entryB) => entryA.id - entryB.id);
        }
      } else{
        this.listWithData[index].entry.push(entry);
      }
    });
    this.listRoomsUnbooked = [];
    this.listOfRooms.forEach((room) => {
      let temp = this.listWithData.find((roomEntry) => room.id == roomEntry.id);
      if (temp == undefined) {
        this.listRoomsUnbooked.push(room.id);
      }
    });
    this.listWithData.sort((entryA, entryB) => entryA.id - entryB.id);
    this.listWithData.forEach((entry) => entry.setColor(this.behavior.setColor(entry)));
    return this.listWithData;
  }

  binarySearchWithDate(roomKey: number, dateKey: string, input: MapRoomEntry[]) {
    if (input.length < 1) {
      return -1;
    }
    let low = 0;
    let high = input.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (input[mid].id == roomKey && input[mid].startDate === dateKey) {
        return mid;
      }
      if (roomKey > input[mid].id) {
        low = mid + 1;
      } else if (roomKey == input[mid].id && Date.parse(dateKey) > Date.parse(input[mid].startDate)) {
        low = mid + 1;
      }
      if (roomKey < input[mid].id) {
        high = mid - 1;
      } else if (roomKey == input[mid].id && Date.parse(dateKey) < Date.parse(input[mid].startDate)) {
        high = mid - 1;
      }
    }
    return -1;
  }
  binarySearch(roomKey: number, input: MapRoomEntry[]) {
    if (input.length < 1) {
      return -1;
    }
    let low = 0;
    let high = input.length - 1;
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (input[mid].id == roomKey) {
        return mid;
      }
      if (roomKey > input[mid].id) {
        low = mid + 1;
      }
      if (roomKey < input[mid].id) {
        high = mid - 1;
      }
    }
    return -1;
  }
}

export class MapRoomEntry {
  id: number;
  startDate: string;
  endDate: string;
  academy: string;
  color: string
  seats: number;
  price: number;
  entry: ScheduleEntry[] = [];

  constructor(id: number, startDate: string, endDate: string, academy: string, seats: number, price: number) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.academy = academy;
    this.seats = seats;
    this.price = price;
    this.color = '#ffffff';

  }

  getTotalHours() {
    let hours = 0;
    this.entry.forEach((scheduleEntry) => {
      let tempDate = new Date(scheduleEntry.startDate);
      if (tempDate.getDay() > 0 && tempDate.getDay() < 6) {
        let startTime = new Date("1970-01-01 " + scheduleEntry.startTime).getTime();
        let endTime = new Date("1970-01-01 " + scheduleEntry.endTime).getTime();
        let startCutoff = new Date("1970-01-01 05:00").getTime();
        let endCutoff = new Date("1970-01-01 23:59").getTime();
        hours += this.calculateHours(startTime, endTime, startCutoff, endCutoff);
      }
    });
    return hours;
  }

  getTotalWorkHours() {
    let hours = 0;
    this.entry.forEach((scheduleEntry) => {
      let tempDate = new Date(scheduleEntry.startDate);
      if (tempDate.getDay() > 0 && tempDate.getDay() < 6) {
        let startTime = new Date("1970-01-01 " + scheduleEntry.startTime).getTime();
        let endTime = new Date("1970-01-01 " + scheduleEntry.endTime).getTime();
        let startCutoff = new Date("1970-01-01 08:00").getTime();
        let endCutoff = new Date("1970-01-01 17:00").getTime();
        hours += this.calculateHours(startTime, endTime, startCutoff, endCutoff);
      }
    });
    return hours;
  }

  private calculateHours(startTime : number, endTime : number, startCutoff : number, endCutoff : number ){
    let tempHours : number = 0;
    if (startTime >= startCutoff && endTime <= endCutoff) {
      tempHours += (endTime - startTime) / (60 * 60 * 1000);
    } else if (startTime < startCutoff) {
      tempHours += (endTime - startCutoff) / (60 * 60 * 1000);
    } else if (endTime > endCutoff) {
      tempHours += (endCutoff - startTime) / (60 * 60 * 1000);
    }
    return tempHours;
  }

  setColor(inputColor: string) {
    this.color = inputColor;
  }
}
