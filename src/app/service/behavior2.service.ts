import {Injectable} from '@angular/core';
import {SchemaService} from "./schema.service";
import {ScheduleEntry} from "./schema.service";
import {CsvFileReaderService} from "./csv-file-reader.service";
import {startWith} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Behavior2Service {
 // private testScheduleEntry: any[] = [new ScheduleEntry("2012-01-01 08:00:00",
 //   "2012-01-01 10:00:00", "11121", "DVG002")];
  private roomBehavior: Behavior[] = [];


  constructor(private sched: SchemaService, private room: CsvFileReaderService) {
   this.create();
  }
  async  create(){
    await this.startService(await this.sched.getSoapData("",""));
  }
  async startService(data : ScheduleEntry[]) {

    //let schedule : ScheduleEntry[] = await this.sched.getSoapData("", "");
  //  console.log("fuck"+schedule);
    //console.log(this.sched);
    const allRooms = await this.room.getRooms();
  //  console.log("HOR SCHED!!!!!!! " + schedule);
    for (let i = 0; i < allRooms.length; i++) {
      if (parseInt(data[1].room) == allRooms[i].id) {
      //  console.log("I fucking if-fucking-sats, oooh sats ")
        this.roomBehavior.push(new Behavior(allRooms[i].id, data));
       // console.log("FUCKING ROOMBEHAVIOR ARRAY"+this.roomBehavior)
      }
    }
    console.log(this.roomBehavior);

  }
  getRoomBehavior() {
    return this.roomBehavior;
  }
}

export class Behavior {
  room: number;
  color: string = "";
  date: any;
  bookings: ScheduleEntry[];
  private dateError: boolean = false;
  private HOURS_OF_A_WORK_DAY = 8;

  constructor(room: number, bookings: ScheduleEntry[]) {
    this.room = room;
    this.setColor();
    this.setDate();
    this.bookings = bookings;
  }

  setColor() {
    console.log("Fucking color" + this.bookings)
    let hasBadBehavior = false;
    let totalTime = 0;
    let beforeLunch;
    let afterLunch;
    for (let i = 0; i < this.bookings.length; i++) {
      let startTime = this.getMilitaryTime(this.bookings[i].startTime);
      let endTime = this.getMilitaryTime(this.bookings[i].endTime);

      if (endTime > 1145 && endTime < 1215) {
        beforeLunch = this.bookings[i];
      } else if (startTime > 1245 && startTime < 1330) {
        afterLunch = this.bookings[i];
      }
    }

    if (beforeLunch != undefined && afterLunch != undefined) {
      if (beforeLunch.course === afterLunch.course) {
        if (beforeLunch.getTotalHours() + afterLunch.getTotalHours() <= 4) {
          hasBadBehavior = true;
        }
      }
    }
// TODO Byt ut loop mot olivers service
    for (let i = 0; i < this.bookings.length; i++) {
      totalTime += this.bookings[i].getTotalHours();
    }
    if (totalTime > 7 && !hasBadBehavior) {
      this.color = '#0000ff';
    } else if (this.bookings.length == 2 && hasBadBehavior) {
      this.color = "#ff0000";
    } else if (this.bookings.length > 2 && hasBadBehavior) {
      this.color = '#ff8c00';
    } else {
      this.color = '#ffff00';
    }
  }

  getMilitaryTime(time: string): number {
    const militaryTime = time.replace(':', '');
    return parseInt(militaryTime);
  }

  setDate() {
    this.date = this.bookings[0].startDate;
    for (let i = 0; i < this.bookings.length; i++) {
      if (this.bookings[i].startDate !== this.bookings[i].endDate) {
        this.dateError = true;
      } else if (this.date !== this.bookings[i].startDate) {
        this.dateError = true;
      }
    }
    if(this.dateError){
      this.date = new Date(0, 0, 0);
    }else {
      let split = this.bookings[0].startDate.split("-");
      this.date = new Date(parseInt(split[0]), parseInt(split[1]), parseInt(split[2]));
    }

  }
}
