import { Injectable } from '@angular/core';
import {GetScheduleDataService} from "./get-schedule-data.service";
import {TimeFiltersComponent} from "../time-filters/time-filters.component";

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor(private getData: GetScheduleDataService, private getDays: TimeFiltersComponent) {}
  //TODO Byt namn på metoder
  procent() {
    const numberOfDays = this.getDays.getNumberOfDays();

  }

  //TODO Beräkna antalet använda timmar procentuellt för alla som visas
  //TODO Beräkna kostnaden för bokade timmar
  //TODO Beräkna kostnaden för obokade timmar


}
