import { Component } from '@angular/core';
import {RoomMapService} from "./service/room-map.service";
import {GetScheduleDataService} from "./service/get-schedule-data.service";
import {FilterSwitchService} from "./service/filter-switch.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FilterSwitchService]
})
export class AppComponent {
  title = 'web';
  componentName: any;

  constructor(public filterSwitch : FilterSwitchService) {
  }


  onKey(componentName: string) {
    this.componentName = componentName;
  }

  getKey(){
    return this.componentName;
  }
}
