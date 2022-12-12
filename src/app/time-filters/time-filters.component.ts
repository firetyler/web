import { Component } from '@angular/core';
interface Year {
  value: string;
  viewValue: string;
}
let  date = new Date();
let year = date.getFullYear();
let dayName = date.getDay(); // 0 to 6 it returns the day of the week



@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css']
})
export class TimeFiltersComponent {

constructor() {

}
  ngOnInit(): void {
    this.getWeekNumber();
    console.log(this.getWeekNumber());
  }

 getWeekNumber() {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    let week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
      - 3 + (week1.getDay() + 6) % 7) / 7);
  }


  // @ts-ignore
  years: Year<number>[] = [
    {value: year , viewValue: year},
    {value: year-1 , viewValue: year-1},
    {value: year-2 , viewValue: year-2},
    {value: year-3 , viewValue: year-3},
    {value: year-4 , viewValue: year-4},
];

}
