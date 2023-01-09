import {Injectable} from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";
import {CalculationsService} from "./calculations.service";
import {CsvFileReaderService, Room} from "./csv-file-reader.service";


@Injectable({
  providedIn: 'root'
})
export class MapRoomsService {

  constructor(private csV: CsvFileReaderService, private schema: SchemaService, private calc: CalculationsService) {

  }

  async create() {
    //await this.getRoomNumberCsvService();
    //await this.getRoomNumberScheduleEntryService();
    await this.mergingCsvAndEntryService();
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

  /*async getRoomNumberScheduleEntryService() {
    let data = await this.schema.getSoapData("", "");
    for (let j = 0; j < data.length; j++) {
      //console.log("Room " + data[j].room);
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
  async mergingCsvAndEntryService() {
    const tempArray: any[] = [];
    let dataEntry = await this.schema.getSoapData("", "");
    let dataCsv = await this.csV.getRooms();
    for (let i = 0; i < dataEntry.length; i++) {
      for (let j = 0; j < dataCsv.length; j++) {
        //if (dataEntry.filter()) {
          if (dataEntry[i].room == dataCsv[j].id) {
          tempArray.push(dataEntry[i].room, dataEntry[i].startTime, dataEntry[i].endTime,
            dataEntry[i].startDate, dataEntry[i].endDate, dataEntry[i].course, dataCsv[j].academy,
            dataCsv[j].seats, dataCsv[j].price)
            /**

            console.log(dataEntry[i].room, dataEntry[i].startTime, dataEntry[i].endTime,
              dataEntry[i].startDate, dataEntry[i].endDate, dataEntry[i].course, dataCsv[j].academy,
              dataCsv[j].seats, dataCsv[j].price);
          **/
           }
        }
      }
        return tempArray;
    }
  //}

}
