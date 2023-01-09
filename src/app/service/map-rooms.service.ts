import {Injectable} from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";
import {CalculationsService} from "./calculations.service";
import {CsvFileReaderService, Room} from "./csv-file-reader.service";


@Injectable({
  providedIn: 'root'
})
export class MapRoomsService {
  tempArray: any[] = [];
  dataEntry: any[] = [];
  dataCsv: any[] = [];
  private entryIndex : number = 0;
  private csvIndex: number = 0;

  constructor(private csV: CsvFileReaderService, private schema: SchemaService, private calc: CalculationsService,) {

  }

  async create() {
    //await this.getRoomNumberCsvService();
    //await this.getRoomNumberScheduleEntryService();
    await this.getDataEntryArray();
  }

  mappingArray(csvInput: Room, schemaInput: ScheduleEntry) {
    const room: any[] = [];
    const csv: any[] = [];
    const schema: any[] = [];
    for (let i = 0; i < ScheduleEntry.length; i++) {
      for (let j = 0; j < ScheduleEntry.length; j++) {


      }
    }
  }

  /* async getRoomNumberScheduleEntryService() {
     let data = await this.schema.getSoapData("", "");
     for (let j = 0; j < data.length; j++) {
       //console.log(data[j]);
     }
   }*/

  /* async getRoomNumberCsvService() {
     let data = await this.csV.getRooms();
     for (let i = 0; i < data.length; i++) {
       //console.log("Csv " + data[i].id);
     }
   }*/

  //test av ett duplicerings fel
  //!tempArray.includes(dataEntry[i].room)


  async getDataEntryArray() {
    this.dataEntry = await this.schema.getSoapData("", "");
    this.dataCsv = await this.csV.getRooms();
    let arr: any [] = [];
    let arr2: any [] = [];
    for (let i = 0; i < this.dataEntry.length; i++) {
          if (!arr.includes(this.dataEntry[i])) {
            arr.push(this.dataEntry[i]);
          }
        }

    for (let i = 0; i < arr.length; i++) {
      for(let j = 0; j<this.dataCsv.length;j++){
        if(this.dataCsv[j].id == arr[i].room)
          arr2.push(new RoomMapEntry(this.dataCsv[j].id,this.dataCsv[j].academy,this.dataCsv[j].seats,this.dataCsv[j].price
            ,arr[i].startDate,arr[i].course,arr[i].startTime,arr[i].endTime));
      }
    }
    return arr2;
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
  room:number;

  constructor(room: number,academy: string, seats: number,price:number,startDate: string, course: string,startTime: string, endTime: string) {
    this.room = room;
    this.course = course;
    this.academy=academy;
    this.seats=seats;
    this.price=price;
    this.startDate=startDate;
    this.startTime=startTime;
    this.endTime=endTime;

  }
}




