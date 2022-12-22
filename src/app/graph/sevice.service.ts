import {Injectable, OnChanges, OnInit} from '@angular/core';
import {Days} from "./days";
import {Month} from "./month";


@Injectable({
  providedIn: 'root'
})


export class SeviceService implements OnChanges {


  constructor() {
  }

  ngOnChanges(): void {

  }

  private _year: any;
  private _month: any;
  private _hour: any;
  private _minutes: any;
  private _startTime: any;
  private _endTime: any;
  private _totalTime: any;


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
  setTImeBorder(value : number , overTime :boolean){
   let max =8;
   let min =0;
   if (min <= value  && value <= max && overTime == false){
     return value;
   }else{
     return value;
   }
  }
 SpecifiedDaysInMonth(month : Month , year : number ){
    return new Date(year , month,0).getDate();

 }

}
