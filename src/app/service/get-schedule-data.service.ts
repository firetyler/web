import { Injectable } from '@angular/core';
import {ScheduleEntry, SchemaService} from "./schema.service";

@Injectable({
  providedIn: 'root'
})
export class GetScheduleDataService {
  startDatum: string = "";
  slutDatum: string = "";
  scheduleArray: ScheduleEntry[] = [];
  constructor(private getData: SchemaService) { }

  setDates(startDate: Date, numberOfDays: number) {
    console.log(startDate + " bajs " + numberOfDays);
    this.startDatum = "2022-01-12";
    this.slutDatum = "2022-02-13";
  }

  getSoapDataIterated() {
    let datumArray = this.startDatum.split("-");

  }
  //TODO hämta datum
  //TODO hämta soap för varje dag
  //TODO skicka tillbaka en lång array med allt B)
}
