import { Component } from '@angular/core';
import {RoomMapService} from "./service/room-map.service";
import {GetScheduleDataService} from "./service/get-schedule-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  componentName: any;

/**async getA(){
    await this.service.setDates(new Date(2019, 1, 4), 7);
    await this.h.mapRooms();
  }
 **/

  onKey(componentName: string) {
    this.componentName = componentName;
  }
}
