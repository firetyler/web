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

    let roomExists: boolean = false;
    this.listOfRooms = await this.csvReader.getRooms();
    this.listOfScheduleEntry = await this.getScheduleData.getScheduleArray();
    this.listOfScheduleEntry.forEach((entry) => {
      let mapRoom = this.listWithData.filter((mapRoom) => mapRoom.id == entry.room);
      if (mapRoom.length > 0) {
        mapRoom[0].entry.push(entry);
        roomExists = true;
      }
/*      for (let i = 0; i < this.listWithData.length; i++) {
        if (this.listWithData[i].id == entry.room) {
        //  console.log("fuck you if sats")
          this.listWithData[i].entry.push(entry);
          roomExists = true;
        }

      }*/

      if (!roomExists) {
        let temp = this.listOfRooms.filter((room) => room.id == entry.room);
        if (temp.length > 0) {
          this.listWithData.push(new MapRoomEntry(temp[0].id,entry.course ,entry.startDate,entry.endDate, temp[0].academy, temp[0].seats, temp[0].price, entry))
        }


      }
      roomExists = false;
    });
    this.listWithData.forEach((entry) => entry.setColor(this.behavior.setColor(entry)))
    return this.listWithData;
  }


}

export class MapRoomEntry {
  id: number;
  startDate: string;
  endDate:string;
  academy: string;
  color: string
  seats: number;
  price: number;
  entry: ScheduleEntry[] = [];
  course:string;

  constructor(id: number,course:string, startDate: string,endDate:string ,academy: string, seats: number, price: number, entry: ScheduleEntry) {
    this.id = id;
    this.course=course;
    this.startDate = startDate;
    this.endDate=endDate;
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

  setColor(inputColor: string) {
    this.color = inputColor;
  }
}
