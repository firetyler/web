import {Component, EventEmitter, Output,Input} from '@angular/core';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";

import {DateAdapter, MAT_DATE_LOCALE, NativeDateAdapter} from "@angular/material/core";
import { Platform } from '@angular/cdk/platform';

import { MonthpickerDateAdapter } from './monthpicker-date-formats';

interface Year {
  value: string;
  viewValue: string;
}
interface Week {
  value: string;
  viewValue: string;
}
let  date = new Date();
let year = date.getFullYear();
let dayName = date.getDay(); // 0 to 6 it returns the day of the week


@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MonthpickerDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
  ]
})
export class TimeFiltersComponent {
  numbers: Array<number> = [];
  lists : Array <number>[] = [];

  constructor() {
    this.numbers = Array(53).fill(1).map((x, i) => i + 1);
  }

  ngOnInit(): void {
    this.getWeekNumber();
       console.log(this.getWeekNumber());
    //this.getWeeks();
  }

  // @ts-ignore
 years: Year<number>[] = [
    {value: "Select", viewValue: "Select"},
    {value: year, viewValue: year},
    {value: year - 1, viewValue: year - 1},
    {value: year - 2, viewValue: year - 2},
    {value: year - 3, viewValue: year - 3},
    {value: year - 4, viewValue: year - 4},
  ];


  @Input()
  public monthAndYear: Date | null = null;

  @Output()
  public monthAndYearChange = new EventEmitter<Date | null>();

  public emitDateChange(event: MatDatepickerInputEvent<Date | null>): void {
    this.monthAndYear = event.value;
    this.monthAndYearChange.emit(event.value);
  }

  public monthChanged(value: any, widget: any): void {
    this.monthAndYear = value;
    widget.close();
  }
}


