import {Injectable, Input, OnChanges, OnInit} from '@angular/core';
import {Days} from "./days";
import {Month} from "./month";
import {TimeFiltersComponent} from "../time-filters/time-filters.component";


@Injectable({
  providedIn: 'root'
})


export class SeviceService implements OnChanges {
  private _year: any;

  private _month: any;
  private _hour: any;
  private _minutes: any;
  private _totalTime: any;


  constructor() {
  }

  ngOnChanges(): void {
  }
// 6072 på ett år
  totalTimOFYear: number = 6072;
  getAllMonth() {
   const m = Object.keys(Month).filter((v) => isNaN(Number(v)));
   m.forEach((value) =>{
     return value;
    });
  }
  getAllDays(){
    const d = Object.keys(Days).filter((d) => isNaN(Number(d)));
    d.forEach((value)=>{
      return value;
    });
  }
}
