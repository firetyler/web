import { Injectable } from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";
import {CalculationsService} from "./calculations.service";
import {CsvFileReaderService, Room} from "./csv-file-reader.service";


@Injectable({
  providedIn: 'root'
})
export class MapRoomsService {

  constructor(private csV : CsvFileReaderService,private schema : SchemaService, private calc : CalculationsService){

  }

  async create(){
    await this.getRoomNumberCsvService();
    await this.getRoomNumberScheduleEntryService();
  }
  mappingArray(csvInput : Room, schemaInput : ScheduleEntry){
   const room : any[] = [];
   const csv : any[] = [];
   const schema : any[] = [];
   for(let i = 0; i < ScheduleEntry.length ; i++){
      for(let j = 0; j < ScheduleEntry.length ; j++){


        }
      }
    }
    async getRoomNumberScheduleEntryService(){
      let data = await this.schema.getSoapData("","");
      for(let j =0; j<data.length;j++){
        console.log("Room " + data[j].room);
      }
    }
    async getRoomNumberCsvService(){
      let data = await this.csV.getRooms();
      for(let i =0; i<data.length;i++){
          console.log("Csv " + data[i].id);
      }
    }

}
