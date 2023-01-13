import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import axios from "axios";
import {ScheduleEntry} from "./schema.service";

@Injectable({
  providedIn: 'root'
})


export class CsvFileReaderService {
  private roomArray: Room[] = [];
  constructor() { }

  async getRooms() : Promise<Room[]> {
    let data = "";
    const axi = axios.create();
    await axi.get('assets/rooms.csv', {responseType: 'text'})
      .then(
        res => {
          data = res.data;
        }, error => {
          console.log(error)
        }
      )
    let csvToRowArray = data.split("\n");
    for (let i =1; i < csvToRowArray.length-1; i++) {
      let row = csvToRowArray[i].split(";");
      this.roomArray.push(new Room(parseInt(row[0],10),
        row[1],
        parseInt(row[2],10),
        parseInt(row[3],10)));
    }
  //  console.log(this.roomArray);
    return this.roomArray;
  }

}

export class Room {
  id: number;
  academy: string;
  seats: number;
  price: number;

  constructor(id: number, academy: string, seats: number, price: number) {
    this.id = id;
    this.academy = academy;
    this.seats = seats;
    this.price = price;
  }
}


