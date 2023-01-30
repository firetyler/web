import {Injectable} from '@angular/core';
import {CsvFileReaderService, RoomEntry} from "./csv-file-reader.service";
import {GetScheduleDataService} from "./get-schedule-data.service";
import {ScheduleEntry} from "./schema.service";
import {BehaviorService} from "./behavior.service";


@Injectable({
  providedIn: 'root'
})
export class RoomMapService {
  listOfRooms: RoomEntry[] = [];
  listOfScheduleEntry: ScheduleEntry[] = [];
  listWithData: MapRoomEntry[] = [];

  constructor(private csvReader: CsvFileReaderService, private getScheduleData: GetScheduleDataService, private behavior: BehaviorService) {}

  async mapRooms(hasDate: Boolean) {
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
    this.listOfRooms.forEach((room) => {
      let temp = this.listWithData.find((roomEntry) => room.id == roomEntry.id);
      if (temp == undefined) {
        this.listWithData.push(new MapRoomEntry(room.id,"","",room.academy,room.seats,room.price))
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
      let startTime = parseInt(scheduleEntry.startTime.replace(":", ""));
      let endTime = parseInt(scheduleEntry.endTime.replace(":", ""));
      if ((startTime > 50000) && (endTime < 240000)) {
        hours += scheduleEntry.getTotalHours();
      } else if (startTime < 50000) {
        const startTimeArray = [5, 0];
        const endTimeArray = scheduleEntry.startTime.split(':');
        let startMinutes = (60 * startTimeArray[0]) + startTimeArray[1];
        let endMinutes = (60 * parseInt(endTimeArray[0])) + parseInt(endTimeArray[1]);
        hours += (endMinutes - startMinutes)/60;
      }
    });
    return hours;
  }

  getTotalWorkHours() {
    let hours = 0;
    this.entry.forEach((scheduleEntry) => {
      let tempDate = new Date(scheduleEntry.startDate);
      if (tempDate.getDay() > 0 && tempDate.getDay() < 6) {
        let startTime = parseInt(scheduleEntry.startTime.replace(":", ""));
        let endTime = parseInt(scheduleEntry.endTime.replace(":", ""));
        if ((startTime > 80000) && (endTime < 170000)) {
          hours += scheduleEntry.getTotalHours();
        } else if (startTime < 80000) {
          const startTimeArray = [8, 0];
          const endTimeArray = scheduleEntry.startTime.split(':');
          let startMinutes = (60 * startTimeArray[0]) + startTimeArray[1];
          let endMinutes = (60 * parseInt(endTimeArray[0])) + parseInt(endTimeArray[1]);
          hours += (endMinutes - startMinutes) / 60;
        } else if (endTime > 170000) {
          const startTimeArray = scheduleEntry.startTime.split(':');
          const endTimeArray = [17, 0];
          let startMinutes = (60 * parseInt(startTimeArray[0])) + parseInt(startTimeArray[1]);
          let endMinutes = (60 * endTimeArray[0]) + endTimeArray[1];
          hours += (endMinutes - startMinutes)/60;
        }
      }
    })
    return hours;
  }

  getTotalWorkDays(){
    let days : number = 0;
    let lastDate : Date;
    this.entry.sort((entryA, entryB) => parseInt(entryA.startDate) - parseInt(entryB.startDate));
    this.entry.forEach((scheduleEntry) => {
      let currDate = new Date(scheduleEntry.startDate);
      if (currDate.getDay() > 0 && currDate.getDay() < 6 && currDate != lastDate) {
        lastDate = currDate;
        days++;
      }


    })
    return days;
  }

  setColor(inputColor: string) {
    this.color = inputColor;
  }
}
