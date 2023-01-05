import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Behavior2Service {

  constructor(private schedule : ScheduleEntry) { }
}
export class Behavior {
  room : number;
  color : string;
  date : any;
  bookings : ScheduleEntry[];
}
