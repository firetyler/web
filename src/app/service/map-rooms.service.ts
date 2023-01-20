import {Injectable} from '@angular/core';
import {SchemaService} from "./schema.service";
import {CalculationsService} from "./calculations.service";
import {CsvFileReaderService} from "./csv-file-reader.service";
import {GetScheduleDataService} from "./get-schedule-data.service";


@Injectable({
  providedIn: 'root'
})
export class MapRoomsService {
  tempArray: any[] = [];
  dataEntry: any[] = [];
  dataCsv: any[] = [];
  arr: any [] = [];
  arr2: any [] = [];
  stuf : any[] = [];

  constructor(private csV: CsvFileReaderService, private schema: SchemaService, private calc: CalculationsService, private getSchedule: GetScheduleDataService) {

  }

  async create() {
    //await this.getRoomNumberCsvService();
    //await this.getRoomNumberScheduleEntryService();
   // await this.getDataEntryArray();
  }

  async getDataEntryArray(){
    //this.dataEntry =  await this.getSchedule.getScheduleArray();
   // console.log("entry " + this.dataEntry[0].room)
   // this.dataEntry = await  this.getSchedule.getScheduleArray();
    this.dataEntry = await this.schema.getSoapData(new Date());
    this.dataCsv = await this.csV.getRooms();

    for (let i = 0; i < this.dataEntry.length; i++) {
      if (!this.arr.includes(this.dataEntry[i])) {
        this.arr.push(this.dataEntry[i]);
      }
    }


    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.dataCsv.length; j++) {
        if (this.dataCsv[j].id == this.arr[i].room && this.dataCsv[j].seats != 0 )
          this.arr2.push(new RoomMapEntry(this.dataCsv[j].id, this.dataCsv[j].academy, this.dataCsv[j].seats, this.dataCsv[j].price
            , this.arr[i].startDate, this.arr[i].course, this.arr[i].startTime, this.arr[i].endTime));
      }
    }


    return this.arr2;
  }

  async getEntryArray(){
    console.log("Map room service class "+this.arr2);
    return this.arr2;
  }


}


export class RoomMapEntry {
  startDate: string;
  course: string;
  academy: string;
  seats: number;
  price: number;
  startTime: string;
  endTime: string;
  room: number;

  constructor(room: number, academy: string, seats: number, price: number, startDate: string, course: string, startTime: string, endTime: string) {
    this.room = room;
    this.course = course;
    this.academy = academy;
    this.seats = seats;
    this.price = price;
    this.startDate = startDate;
    this.startTime = startTime;
    this.endTime = endTime;

  }

}
