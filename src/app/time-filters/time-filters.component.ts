import { Component } from '@angular/core';
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
  styleUrls: ['./time-filters.component.css']
})
export class TimeFiltersComponent {
  numbers: Array<number> = [];
  lists : Array <number>[] = [];

  constructor() {
    this.numbers = Array(53).fill(1).map((x, i) => i + 1);
  }

  ngOnInit(): void {
    /*  this.getWeekNumber();
       console.log(this.getWeekNumber());*/
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

}
