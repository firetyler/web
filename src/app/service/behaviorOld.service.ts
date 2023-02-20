import { Injectable } from '@angular/core';
import {Time} from './time';



@Injectable({
  providedIn: 'root'
})
export class BehaviorOldService {

  constructor() {

  }

  private checkStartPeriod(period:any){
  let p : any;

    if(Time.startP1 <= period.StartTime && period.StartTime < Time.endP1){
      p = this.checkEndPeriod(period);
      return period.course + ";P1/" + p;
    }
    if(Time.startP2 <= period.StartTime && period.StartTime < Time.endP2){
      p = this.checkEndPeriod(period);
      return period.course + ";P2/" + p;
    }
    if(Time.startP3 <= period.StartTime && period.StartTime < Time.endP3){
      p = this.checkEndPeriod(period);
      return period.course + ";P3/" + p;
    }
    if(Time.startP4 <= period.StartTime && period.StartTime < Time.endP4){
      p = this.checkEndPeriod(period);
      return period.course + ";P4/" + p;
    }
    return null;
  }

  private checkEndPeriod(period:any){

    if(period.EndTime <= Time.endP1){
      return "P1"
    }
    if(period.EndTime  > Time.endP1 && period.EndTime  <= Time.endP2){
      return "P2"
    }
    if(period.EndTime  > Time.endP2 && period.EndTime  <= Time.endP3){
      return "P3"
    }
    if(period.EndTime  > Time.endP3 && period.EndTime  <= Time.endP4){
      return "P4"
    }
    return null
  }

  getBehavior (json : any){
    let period = new Map();
    let splitted : string[];

    for(let i = 0; i < json.length; i++){

      let str = this.checkStartPeriod(json[i]);
      if(str != null){
        splitted = str.split(";", 2);
        period.set(splitted[1], splitted[0]);
      }
      period.set(null, null);
    }

    if(period.get("P2/P2") == period.get("P3/P3") || period.has("P2/P3")){

      if(period.has(null) || !period.has("P1/P1") && !period.has("P4/P4")){
        return '#ff0000';
      }
      return '#ff8c00';
    }
    if(period.has("P1/P1") && period.has("P2/P2") && period.has("P3/P3") && period.has("P4/P4")){
      return '#0000ff';
    }
    if(period.has("P1/P2") && period.has("P3/P4")){
      return '#0000ff';
    }
    if(period.has("P1/P2") && period.has("P3/P3") && period.has("P4/P4")){
      return '#0000ff';
    }
    if(period.has("P1/P1") && period.has("P2/P2") && period.has("P3/P4")){
      return '#0000ff';
    }

    return '#ffff00';

  }
}
/*if(!period.has(null)){
      return '#0000ff';
    }*/
/*if(!period.includes(null) && period[1] != period[2]) {
      return '#0000ff';
    }
    if (period.includes(null) && period[1] != period[2]){
      return '#ffff00';
    }
    if (period[1] == period[2]){
      return '#ff8c00'
    }
    if(period[1] == period[2] && period.indexOf(null, 0) && period.indexOf(null, 3)){
      return '#ff0000'
    }*/


/*if(Time.startP1 <= "0800" && "0800" < Time.endP1 && "0800" <= Time.endP1){
     return "kurs";
   }
   if(Time.startP2 <= "0800" && "0800" < Time.endP2 && "0800" <= Time.endP2){
     return "kurs";
   }
   if(Time.startP3 <= "0800" && "0800" < Time.endP3 && "0800" <= Time.endP3){
     return "kurs";
   }
   if(Time.startP4 <= "0800" && "0800" < Time.endP4 && "0800" <= Time.endP4){
     return "kurs";
   }*/
