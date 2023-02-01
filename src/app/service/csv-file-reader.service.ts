import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
/**
 * Reads a CSV file and creates a array with RoomEntry objects
 */
export class CsvFileReaderService {
  private roomArray: RoomEntry[] = [];
  constructor() { }

  /**
   * Reads the CSV file and creates an object for each room
   * @returns roomArray, an array of all the rooms
   */
  async getRooms() {
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
      this.roomArray.push(new RoomEntry(parseInt(row[0],10),
        row[1],
        parseInt(row[2],10),
        parseInt(row[3],10)));
    }
    return this.roomArray;
  }
}

/**
 * A room object with the following properties: id (name of the room), academy, seats and price.
 */
export class RoomEntry {
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


