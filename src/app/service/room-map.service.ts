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
  ListOfColors: string = "";

  constructor(private csvReader: CsvFileReaderService, private getScheduleData: GetScheduleDataService, private behavior: BehaviorService) {
  }

  async mapRooms() {

    this.listOfRooms = await this.csvReader.getRooms();
    this.listOfScheduleEntry = await this.getScheduleData.getScheduleArray();
    this.listOfScheduleEntry.forEach((entry) => {
      let index: number = this.binarySearch(entry.room, entry.startDate, this.listWithData);
      if (index < 0) {
        let temp = this.listOfRooms.find((room) => room.id == entry.room);
        if (temp != undefined) {
          this.listWithData.push(new MapRoomEntry(temp.id, entry.startDate, entry.endDate, temp.academy,
            temp.seats, temp.price, entry))
          this.listWithData.sort((entryA,entryB) => entryA.id - entryB.id);
        }
      } else{
        this.listWithData[index].entry.push(entry);
      }

    });
    /*   this.listOfScheduleEntry.forEach((entry) => {
        let mapRoom = this.listWithData.filter((mapRoom) => mapRoom.id == entry.room);
        if (mapRoom.length > 0) {
          mapRoom[0].entry.push(entry);
          roomExists = true;
        }

        if (!roomExists) {
          let temp = this.listOfRooms.filter((room) => room.id == entry.room);
          if (temp.length > 0) {
            this.listWithData.push(new MapRoomEntry(temp[0].id,entry.course ,entry.startDate,entry.endDate, temp[0].academy, temp[0].seats, temp[0].price, entry))
          }


        }
        roomExists = false;
      });*/

    this.listWithData.forEach((entry) => entry.setColor(this.behavior.setColor(entry)))
    return this.listWithData;
  }

  binarySearch(roomKey: number, dateKey: string, input: MapRoomEntry[]) {
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

  constructor(id: number, startDate: string, endDate: string, academy: string, seats: number, price: number, entry: ScheduleEntry) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.academy = academy;
    this.seats = seats;
    this.price = price;
    this.color = '#ffffff';
    this.entry.push(entry);
  }

  getTotalHours() {
    let hours = 0;
    this.entry.forEach((scheduleEntry) => {
      hours += scheduleEntry.getTotalHours();
    });
    return hours;
  }

  getTotalWorkHours() {
    let hours = 0;
    this.entry.forEach((scheduleEntry) => {
      let startTime = parseInt(scheduleEntry.startTime.replace(":", ""));
      let endTime = parseInt(scheduleEntry.endTime.replace(":", ""));
      if ((startTime > 80000) && (endTime < 170000)) {
        hours += scheduleEntry.getTotalHours();
      } else if (startTime < 80000) {
        const startTimeArray = [8, 0];
        const endTimeArray = scheduleEntry.startTime.split(':');
        let startMinutes = 60 * startTimeArray[0] + startTimeArray[1];
        let endMinutes = 60 * parseInt(endTimeArray[0]) + parseInt(endTimeArray[1]);
        hours += (endMinutes - startMinutes);
      } else if (endTime > 170000) {
        const startTimeArray = scheduleEntry.startTime.split(':');
        const endTimeArray = [17, 0];
        let startMinutes = 60 * parseInt(startTimeArray[0]) + parseInt(startTimeArray[1]);
        let endMinutes = 60 * endTimeArray[0] + endTimeArray[1];
        hours += (endMinutes - startMinutes) * 60;
      }
    })
    return hours;
  }

  setColor(inputColor: string) {
    this.color = inputColor;
  }
}