import { Component, OnInit } from '@angular/core';
import {SchemaService} from "../service/schema.service";
import {CalculationsService} from "../service/calculations.service";
import {MapRoomsService} from "../service/map-rooms.service";
import {ScheduleEntry} from "../service/schema.service";
import {Behavior2Service} from "../service/behavior2.service";
import {RoomMapService} from "../service/room-map.service";
import {GetScheduleDataService} from "../service/get-schedule-data.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  json: any;
  constructor(private service3 : Behavior2Service,private h: RoomMapService, private service : GetScheduleDataService,private  service2 : CalculationsService) {}

  async ngOnInit() {
    /*    this.service.getSoapData(new Date());
        this.service2.create("","");
        this.h.create();
        this.service3.getRoomBehavior();
        this.service3.create();*/
    await this.service.setDates(new Date(2019, 1, 4), 7);
    await this.h.mapRooms();
  }

}
