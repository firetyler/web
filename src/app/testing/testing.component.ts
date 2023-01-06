import { Component, OnInit } from '@angular/core';
import {ScheduleEntry} from "../service/schema.service";
import {Behavior2Service} from "../service/behavior2.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css'],

})
export class TestingComponent implements OnInit {
  json: any;
  constructor(private service : Behavior2Service) {}

  ngOnInit(): void {
    this.service.getRoomBehavior();
    this.service.create();
  }
}
