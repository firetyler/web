import {Injectable} from '@angular/core';
import {CsvFileReaderService, RoomEntry} from "./csv-file-reader.service";
import {GetScheduleDataService} from "./get-schedule-data.service";
import {ScheduleEntry} from "./schema.service";


@Injectable({
  providedIn: 'root'
})
export class RoomMapService {
  listOfRooms: RoomEntry[] = [];
  listOfScheduleEntry: ScheduleEntry[] = [];
  listWithData: MapRoomEntry[] = [];

  constructor(private csvReader: CsvFileReaderService, private getScheduleData: GetScheduleDataService) {
  }

  async mapRooms(): Promise<MapRoomEntry[]> {
    let roomExists: boolean = false;
    this.listOfRooms = await this.csvReader.getRooms();
    // console.log(this.listOfRooms);
    this.listOfScheduleEntry = await this.getScheduleData.getScheduleArray();
    // console.log( this.listOfScheduleEntry);
    this.listOfScheduleEntry.forEach((entry) => {
      //  console.log(entry)
      for (let i = 0; i < this.listWithData.length; i++) {
        if (this.listWithData[i].id == entry.room) {
          //  console.log("fuck you if sats")
          this.listWithData[i].entry.push(entry);
          roomExists = true;
        }

      }

      if (!roomExists) {
        let temp = this.listOfRooms.filter((room) => room.id == entry.room);
        //   console.log(temp)
        if (temp.length > 0) {
          this.listWithData.push(new MapRoomEntry(temp[0].id, entry.startDate, temp[0].academy, temp[0].seats, temp[0].price, entry))
        }


      }
      roomExists = false;
    });
    return this.listWithData;
    console.log(this.listWithData);
  }


}

export class MapRoomEntry {
  id: number;
  startDate: string;
  academy: string;
  seats: number;
  price: number;
  entry: ScheduleEntry[] = [];

  constructor(id: number, startDate: string, academy: string, seats: number, price: number, entry: ScheduleEntry) {
    this.id = id;
    this.startDate = startDate;
    this.academy = academy;
    this.seats = seats;
    this.price = price;
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
      let startTime = parseInt(scheduleEntry.startTime.replace(":",""));
      let endTime = parseInt(scheduleEntry.endTime.replace(":",""));
      if ((startTime > 80000) && (endTime < 170000)) {
        hours += scheduleEntry.getTotalHours();
      } else if (startTime < 80000) {
        const startTimeArray = [8,0];
        const endTimeArray = scheduleEntry.startTime.split(':');
        let startMinutes = 60 * startTimeArray[0] + startTimeArray[1];
        let endMinutes = 60 * parseInt(endTimeArray[0]) + parseInt(endTimeArray[1]);
        hours += (endMinutes-startMinutes);
      } else if (endTime > 170000) {
        const startTimeArray = scheduleEntry.startTime.split(':');
        const endTimeArray = [17,0];
        let startMinutes = 60 * parseInt(startTimeArray[0]) + parseInt(startTimeArray[1]);
        let endMinutes = 60 * endTimeArray[0] + endTimeArray[1];
        hours += (endMinutes - startMinutes)*60;
      }
    })
    return hours;
  }
}
