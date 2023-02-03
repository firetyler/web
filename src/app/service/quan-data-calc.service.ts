import { Injectable } from '@angular/core';
import {BehaviorGraphComponent} from "../graph/behavior-graph/behavior-graph.component";
import {RoomEntry} from "./csv-file-reader.service";
import {RoomMapEntry} from "./map-rooms.service";
import {RoomMapService} from "./room-map.service";

@Injectable({
  providedIn: 'root'
})
export class QuanDataCalcService {

  constructor(private rooms : BehaviorGraphComponent) { }
  getBookedWorkHoursPercentage(startDate : string , timePeriod : number){
    let tempArray: any[] = this.getTotalWorkHoursAndDays(startDate, timePeriod);
    let percentage : number = (this.getBookedWorkHours() / tempArray[1]) * 100;
    return percentage ;
  }
  getBookedHoursPercentage(days : number){
    let percentage : number = (this.getBookedHours() / this.getTotalHour(days)) * 100;
    return percentage ;
  }
  getBookedWorkDays(){
    let totalDays : number = this.getBookedWorkHours()/(8*this.getChoosenRooms());
    return totalDays;
  }
  getBookedDays(){
    let totalDays : number = this.getBookedHours()/(19*this.getChoosenRooms());
    return totalDays;
  }
  getUnbookedWorkDays(startDate : string , timePeriod : number){
    let tempArray: any[] = this.getTotalWorkHoursAndDays(startDate, timePeriod);
    let unbookedHours : number = tempArray[1] - this.getBookedWorkHours();
    let totalDays : number = unbookedHours / (8 * this.getChoosenRooms());
    return totalDays;
  }
  getUnbookedDays(days : number){
    let unbookedHours : number = this.getTotalHour(days) - this.getBookedHours()
    let totalDays : number = unbookedHours / (19 * this.getChoosenRooms());
    return totalDays;
  }
 private getBookedWorkHours(){
    let hours : number = 0;
    this.rooms.getInputArray().forEach((roomMapEntry) =>{
      hours += roomMapEntry.getTotalWorkHours();
    })
    return hours;
  }

  private getBookedHours(){
    let hours : number = 0;
    this.rooms.getInputArray().forEach((roomMapEntry) =>{
      hours += roomMapEntry.getTotalHours();
    })
    return hours;
  }

  private getChoosenRooms(){
    let amountOfRooms : number = 0;
    var roomArray : any[] = [];
    this.rooms.getInputArray().forEach((roomMapEntry) =>{
      if(!roomArray.includes(roomMapEntry.id)){
        roomArray.push(roomMapEntry.id);
      }
    })
    amountOfRooms = roomArray.length;
    return amountOfRooms;
  }

  private getTotalWorkHoursAndDays(startDate : string , timePeriod : number){
    let days : number = 0;
    let hours : number = 0;
    let curDate = new Date(startDate);
    for(let i = 0 ; i < timePeriod; i++){
      if (curDate.getDay() > 0 && curDate.getDay() < 6 ) {
        days ++;
        hours += 8;
      }
      curDate.setDate(curDate.getDate() + 1);
    }

    return [days, hours];
  }
  private getTotalHour(days: number){
    return (19*days);
  }
}
