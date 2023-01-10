import { Injectable } from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";

@Injectable({
  providedIn: 'root'
})
export class GetScheduleDataService {
  inputYear : number  = 2018;
  inputMonth : number = 2;
  inputDay : number = 35;

  startDatum: string = "";
  slutDatum: string = "";
  testDatum: Date = new Date(this.inputYear,this.inputMonth,this.inputDay);

  scheduleArray: ScheduleEntry[] = [];
  constructor(private getData: SchemaService) { }

  setDates() {
    //Hämta datum från klass som inte finns
    this.startDatum = "2022-01-12";
    this.slutDatum = "2022-02-13";
  }

  getSoapDataIterated() {
    console.log(this.testDatum.getFullYear()+"-"+this.testDatum.getMonth()+"-"+this.testDatum.getDate()  + " Inputdatum");

this.testDatum.getDay()
  }
  //TODO hämta datum
  //TODO hämta soap för varje dag
  //TODO skicka tillbaka en lång array med allt B)
}
