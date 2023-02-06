import { Injectable } from '@angular/core';
import {BehaviorGraphComponent} from "../graph/behavior-graph/behavior-graph.component";
import {RoomEntry} from "./csv-file-reader.service";
import {RoomMapEntry} from "./map-rooms.service";
import {RoomMapService} from "./room-map.service";
import {QuanDataUpdateService} from "../quanData/quan-data/quan-data-update.service";
@Injectable({
  providedIn: 'root'
})
export class QuanDataCalcService {

  constructor(private rooms : BehaviorGraphComponent, private filterService: QuanDataUpdateService) { }
  getBookedWorkHoursPercentage(startDate : Date|undefined , timePeriod : number){
    let percentage : number = (this.getBookedWorkHours() / this.getTotalWorkHours(startDate, timePeriod)) * 100;
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
  getUnbookedWorkDays(startDate : Date , timePeriod : number){
    let unbookedHours : number = this.getTotalWorkHours(startDate, timePeriod) - this.getBookedWorkHours();
    let totalDays : number = unbookedHours / (8 * this.getChoosenRooms());
    return totalDays;
  }
  getUnbookedDays(days : number){
    let unbookedHours : number = this.getTotalHour(days) - this.getBookedHours()
    let totalDays : number = unbookedHours / (19 * this.getChoosenRooms());
    return totalDays;
  }
 getBookedWorkHours(){
    let hours : number = 0;
    this.filterService.entryArray.forEach((roomMapEntry) =>{
      hours += roomMapEntry.getTotalWorkHours();
    })
    return hours;
  }

  getBookedHours(){
    let hours : number = 0;
    this.filterService.entryArray.forEach((roomMapEntry) =>{
      hours += roomMapEntry.getTotalHours();
    })
    return hours;
  }

  private getChoosenRooms(){
    let amountOfRooms : number = 0;
    var roomArray : any[] = [];
    this.filterService.entryArray.forEach((roomMapEntry) =>{
      if(!roomArray.includes(roomMapEntry.id)){
        roomArray.push(roomMapEntry.id);
      }
    })
    amountOfRooms = roomArray.length;
    return amountOfRooms;
  }

  getTotalWorkHours(startDate : Date|undefined , timePeriod : number){
    let hours : number = 0;
    let curDate = startDate;
    if(curDate!= undefined) {
      for (let i = 0; i < timePeriod; i++) {
        if (curDate.getDay() > 0 && curDate.getDay() < 6) {
          hours += 8;
        }
        curDate.setDate(curDate.getDate() + 1);
      }
    }
    return hours*this.getChoosenRooms();
  }
  getTotalHour(days: number){
    return (19*days*this.getChoosenRooms());
  }
}
