import { Injectable } from '@angular/core';
import {Time} from './time';


@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  public hej = "hej";
  constructor() {

  }

  private checkPeriod(period:any){

    if(Time.startP1 <= "0800" && "0800" < Time.endP1 && "0800" <= Time.endP1){
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
    }
    return null;
  }

  getBehavior (){
    let period = new Array(3);
    let test:String = "test";
    for(let i = 0; i < test.length; i++){
       period[i] = this.checkPeriod(test[i]);
    }

    if(!period.includes(null) && period[1] != period[2]) {
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
    }

    return '#808080';
  }
}
