import { Component, OnInit } from '@angular/core';
import {SchemaService} from "../service/schema.service";
import {CalculationsService} from "../service/calculations.service";
import {MapRoomsService} from "../service/map-rooms.service";
import {GetScheduleDataService} from "../service/get-schedule-data.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  json: any;
  constructor(private h: MapRoomsService, private service : SchemaService,private  service2 : CalculationsService,
  private datum: GetScheduleDataService) {}

  ngOnInit(): void {
    /*this.service.getSoapData("","");
    this.service2.create("","");
    this.h.create();*/
    this.datum.getSoapDataIterated();
  }

}
