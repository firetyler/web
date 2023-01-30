import { Component } from '@angular/core';
import {RoomMapService} from "../../service/room-map.service";
import {RoomMapEntry} from "../../service/map-rooms.service";
import {BehaviorGraphComponent} from "../../graph/behavior-graph/behavior-graph.component";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css']
})
export class BookedComponent {
  constructor() {
  }

}
