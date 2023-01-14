import {Injectable} from '@angular/core';
import {CsvFileReaderService, RoomEntry} from "./csv-file-reader.service";
import {GetScheduleDataService} from "./get-schedule-data.service";
import {ScheduleEntry} from "./schema.service";


@Injectable({
  providedIn: 'root'
})
export class RoomMapService {
  listOfRooms: RoomEntry[] = [];
  listOfScheduleEntry: ScheduleEntry[] = [];
  listWithData: MapRoomEntry[] = [];

  constructor(private csvReader: CsvFileReaderService, private getScheduleData: GetScheduleDataService) {
  }

  async mapRooms() {
    let roomExists: boolean = false;
    this.listOfRooms = await this.csvReader.getRooms();
    this.listOfScheduleEntry = await this.getScheduleData.getScheduleArray();
    this.listOfScheduleEntry.forEach((entry) => {
      for (let i = 0; i < this.listWithData.length; i++) {
        if (this.listWithData[i].id == entry.room) {
          this.listWithData[i].entry.push(entry);
          roomExists = true;
        }
      }
      if (!roomExists) {
        let temp = this.listOfRooms.filter((room) => room.id == entry.room);
        this.listWithData.push(new MapRoomEntry(temp[0].id, entry.startDate, temp[0].academy, temp[0].seats, temp[0].price, entry))
        roomExists = false;
      }
    });
  }


}

export class MapRoomEntry {
  id: number;
  startDate: string;
  academy: string;
  seats: number;
  price: number;
  entry: ScheduleEntry[] = [];

  constructor(id: number, startDate: string, academy: string, seats: number, price: number, entry: ScheduleEntry) {
    this.id = id;
    this.startDate = startDate;
    this.academy = academy;
    this.seats = seats;
    this.price = price;
    this.entry.push(entry);
  }

  getEntry() {
    return this.entry;
  }
}
