import {Injectable} from '@angular/core';
import {MapRoomEntry} from "../service/room-map.service";
import {BehaviorSubject} from "rxjs";
import {RoomEntry} from "../service/csv-file-reader.service";

@Injectable({
  providedIn: 'root'
})
export class RoomFilterService {
  private unbookedRooms = new BehaviorSubject<RoomEntry[]>([]);
  currentUnbookedRooms = this.unbookedRooms.asObservable();
  private numberOfUnbookedRooms = 0;
  private numberOfUnbooked = new BehaviorSubject<number>(0);
  currentNumberOfUnbooked = this.numberOfUnbooked.asObservable();
  constructor() {
  }
  changeUnbookedRooms(unbookedRooms: RoomEntry[]) {
    this.unbookedRooms.next(unbookedRooms);
  }
  changeNumberOfUnbooked(unbookedRooms: number) {
    this.numberOfUnbooked.next(unbookedRooms);
    this.numberOfUnbookedRooms = unbookedRooms;
  }
  async graphFilter(json: any[], array: any[]) {
    console.log(array);
    let dataArray: any[] = [];
    for (let i = 0; i < json.length; i++) {
      for (let j = 0; j < array.length; j++) {
        let level = json[i].id.toString().substring(0, 2) + ':' + json[i].id.toString().substring(2, 3);
        let house = json[i].id.toString().substring(0, 2);
        if (json[i].academy == array[j] || json[i].id == array[j] || level == array[j] || house == array[j]) {
          dataArray.push(json[i]);
        }
      }
      if (array.length == 0) {
        return json;
      }
    }
    return dataArray;
  }
}
