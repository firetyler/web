import { Injectable } from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";
import {createObject} from "rxjs/internal/util/createObject";

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor(private data : SchemaService) {
    this.create("","");
  }
  async create(data : string,data2 : string){
    this.bookedProcent(await  this.data.getSoapData(data, data2));
    this.totalBooked(await  this.data.getSoapData(data,data2));
  }
    bookedProcent(data : ScheduleEntry[]){
    const booked : any[] = [];
    for (let j = 0; j < data.length; j++){
      booked.push(data[j].getpercentOfTotaltimeForOneRoom());
    }
    return booked;
  }
  totalBooked(data : ScheduleEntry[]){
    const total : any[] = [];
    for (let i = 0; i< data.length; i++){
      total.push(data[i].getTotalHours());
    }
    //console.log(total);
    return total;
  }

  unbooked(){

  }
}
