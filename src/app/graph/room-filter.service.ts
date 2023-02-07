import {Injectable} from '@angular/core';
import {MapRoomEntry} from "../service/room-map.service";

@Injectable({
  providedIn: 'root'
})
export class RoomFilterService {
  constructor() {
  }

  async graphFilter(json: MapRoomEntry[], array: any[]) {
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
