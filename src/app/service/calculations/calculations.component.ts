import { Component } from '@angular/core';
import {ScheduleEntry, SchemaService} from "../schema.service";

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.css']
})
export class CalculationsComponent {
  constructor(private b : SchemaService) {
  }
 async bocked(data : ScheduleEntry[]) {
   await this.b.getSoapData("","");
    return 0;
  }
  UnBooked(data : ScheduleEntry[]){
    return 0;
  }
  getCost() : number{
    return 0;
  }
}
