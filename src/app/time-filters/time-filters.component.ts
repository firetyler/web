import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";
import {Platform} from '@angular/cdk/platform';

import {MonthpickerDateAdapter} from './monthpicker-date-formats';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {GetScheduleDataService} from "../service/get-schedule-data.service";

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'primary'},
  }]

})
export class TimeFiltersComponent {
  numbers: Array<number> = [];
  lists: Array<number>[] = [];
  startDate: Date | undefined;
  numberOfDays: number = 0;
  list: any[] = ["7 dagar", "30 dagar"];

  constructor(private dataService: GetScheduleDataService) {}

  onUpdate(dateObject: any) {
    this.startDate = dateObject.value;
  }

  onSelect(event: any) {
    let numberOfDays = event.split(' ');
    this.numberOfDays = parseInt(numberOfDays[0],10);
    if (this.startDate != undefined && this.numberOfDays != 0) {
      this.dataService.setDates(this.startDate, this.numberOfDays);
    } else {
      alert("Vänligen välj ett datum och välj sedan antalet dagar igen!")
    }
  }

  getNumberOfDays() {
    return this.numberOfDays;
  }
  getNumberOfWorkDays() {

  }
}


