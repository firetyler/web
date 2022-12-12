import { Component } from '@angular/core';
interface Year {
  value: string;
  viewValue: string;
}
let  date = new Date();
let year = date.getFullYear();
let day = date.getDay();

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css']
})
export class TimeFiltersComponent {

constructor() {

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
