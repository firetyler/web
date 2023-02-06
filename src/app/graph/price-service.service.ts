import {Injectable} from '@angular/core';
import {MapRoomEntry} from "../service/room-map.service";
import {data} from "cheerio/lib/api/attributes";

@Injectable({
  providedIn: 'root'
})
export class PriceServiceService {
  dataArray: any[] = [];
  constructor() {
  }

  grafFilter(json: MapRoomEntry[], array: any[]) {

    for (let i = 0; i < json.length; i++) {
      for (let j = 0; j < array.length; j++) {
        let level = json[i].id.toString().substring(0, 2) + ':' + json[i].id.toString().substring(2, 3);
        let house = json[i].id.toString().substring(0, 2);
        if (json[i].academy == array[j] || json[i].id == array[j] || level == array[j] || house == array[j]) {
          this.dataArray.push([json[i].id.toString(), json[i].getTotalHours(), json[i].price, json[i].academy, json[i].seats])

        }
        return this.dataArray;
      }
      if (array.length == 0) {


        this.dataArray.push([json[i].id.toString(), json[i].getTotalHours(), json[i].price, json[i].academy, json[i].seats]);

      }
    }
    return this.dataArray;
  }
}


