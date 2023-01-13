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
    this.bookedProcent(await  this.data.getSoapData(new Date()));
    this.totalBooked(await  this.data.getSoapData(new Date));
    //TODO Byt till rätt input
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
