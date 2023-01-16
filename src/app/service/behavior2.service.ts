import {Injectable} from '@angular/core';
import {SchemaService} from "./schema.service";
import {ScheduleEntry} from "./schema.service";
import {CsvFileReaderService} from "./csv-file-reader.service";
import {startWith} from "rxjs";
import {MapRoomsService} from "./map-rooms.service";
import {MapRoomEntry, RoomMapService} from "./room-map.service";
import {closestNode} from "@angular/core/schematics/utils/typescript/nodes";

@Injectable({
  providedIn: 'root'
})
export class Behavior2Service {
  // private testScheduleEntry: any[] = [new ScheduleEntry("2012-01-01 08:00:00",
  //   "2012-01-01 10:00:00", "11121", "DVG002")];
  private roomBehavior: Behavior[] = [];
  private listOfData: any[] = [];
  private listOfFullData : any[] = [];
  constructor(private mapRoom: RoomMapService, private behav:Behavior) {
    this.create();
  }

  async create() {
    await this.startService( await this.mapRoom.mapRooms(),await this.behav.setColor() );
  }

  async startService(json: MapRoomEntry[],json2: Behavior[]) {

    for (let i =0; i < json.length;i++){
        this.listOfFullData.push(new Behavior(json[i].id,
          json[i].entry[i].course,json[i].startDate,json[i].entry[i].endDate,json2[i].color));


    }
    console.log("This is Here "+this.listOfData)
    return this.listOfFullData;
  }

  getRoomBehavior() {
    return this.roomBehavior;
  }
}

export class Behavior {
  room: number;
  date: any;
  bookings: MapRoomEntry[] = [];
  private dateError: boolean = false;
  private HOURS_OF_A_WORK_DAY = 8;
  course: string;
  color: any;
  startDate: string;
  endDate:string;

  constructor(room: number,course:string,startDate:string,endDate:string ,bookings: MapRoomEntry[]) {
    this.room = room;
    this.course=course;
    this.startDate=startDate;
    this.endDate=endDate;
    this.color= this.setColor(bookings);
  }

  setColor(bookings: MapRoomEntry[]) {
    console.log("Fucking color" + bookings)
    let hasBadBehavior = false;
    let totalTime = 0;
    let beforeLunch;
    let afterLunch;
    console.log(bookings[0].entry[0].startTime)
    console.log("outside loop")
    for (let i = 0; i < bookings.length; i++) {
      let startTime = this.getMilitaryTime(bookings[i].entry[i].startTime);
      let endTime = this.getMilitaryTime(bookings[i].entry[i].endTime);
        console.log("insinde loop")
      if (endTime > 1145 && endTime < 1215) {
        console.log("endTime > 1145 && endTime < 1215")
        beforeLunch = bookings[i].entry[i];
      } else if (startTime > 1245 && startTime < 1330) {
        console.log("startTime > 1245 && startTime < 1330")
        afterLunch = bookings[i].entry[i];
      }
    }

    if (beforeLunch != undefined && afterLunch != undefined) {
      console.log("first if")
      if (beforeLunch.course === afterLunch.course) {
        console.log("second if")
        if (beforeLunch.getTotalHours() + afterLunch.getTotalHours() <= 4) {
          console.log("true we are inside the third if")
          hasBadBehavior = true;
        }
      }
    }
// TODO Byt ut loop mot olivers service
    for (let i = 0; i < bookings.length; i++) {
      totalTime += bookings[i].getTotalHours();
    }
    if (totalTime > 7 && !hasBadBehavior) {
      console.log("blue")
     return this.color = '#0000ff';
    } else if (bookings.length == 2 && hasBadBehavior) {
      console.log("red")
     return this.color = "#ff0000";
    } else if (bookings.length > 2 && hasBadBehavior) {
      console.log("orange")
      return this.color = '#ff8c00';
    } else {
      console.log("Yellow")
    return  this.color = '#ffff00';
    }
  }

  getMilitaryTime(time: string): number {
    const militaryTime = time.replace(':', '');
    return parseInt(militaryTime);
  }

 /* setDate(bookings: ScheduleEntry[]) {
    this.date = bookings[0].startDate;
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].startDate !== bookings[i].endDate) {
        this.dateError = true;
      } else if (this.date !== bookings[i].startDate) {
        this.dateError = true;
      }
    }
    if (this.dateError) {
      this.date = new Date(0, 0, 0);
    } else {
      let split = bookings[0].startDate.split("-");
      this.date = new Date(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]));
    }

  }*/
}
