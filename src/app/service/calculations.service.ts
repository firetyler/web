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
    this.bokedProcent(await  this.data.getSoapData(data, data2));
    this.totalBoked(await  this.data.getSoapData(data,data2));
  }
    bokedProcent(data : ScheduleEntry[]){
    const boked : any[] = [];
    for (let j = 0; j < data.length; j++){
      boked.push(data[j].getpercentOfTotaltimeForOneRoom());
    }
    return boked;
  }
  totalBoked(data : ScheduleEntry[]){
    const total : any[] = [];
    for (let i = 0; i< data.length; i++){
      total.push(data[i].getTotalHours());
    }
    //console.log(total);
    return total;
  }

  unboked(){

  }
}
