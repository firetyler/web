import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  constructor(times:Times) {

  }

  private checkPeriod(period:any){

    if(Times.startP1 <= "0800" && "0800" < Times.endP1 && "0800" <= Times.endP1){
      return "kurs";
    }
    if(Times.startP2 <= "0800" && "0800" < Times.endP2 && "0800" <= Times.endP2){
      return "kurs";
    }
    if(Times.startP3 <= "0800" && "0800" < Times.endP3 && "0800" <= Times.endP3){
      return "kurs";
    }
    if(Times.startP4 <= "0800" && "0800" < Times.endP4 && "0800" <= Times.endP4){
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
 enum Times {
  startP1 = "0800",
  endP1 = "1000",
  startP2 = "1000",
  endP2 = "1200",
  startP3 = "1300",
  endP3 = "1500",
  startP4 = "1500",
  endP4 = "1700",
  startP5 = "1700",
  endP5 = "2100",
}
