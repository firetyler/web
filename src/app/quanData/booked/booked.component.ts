import {Component, OnChanges, OnInit} from '@angular/core';
import {RoomMapService} from "../../service/room-map.service";
import {RoomMapEntry} from "../../service/map-rooms.service";
import {BehaviorGraphComponent} from "../../graph/behavior-graph/behavior-graph.component";
import {QuanDataCalcService} from "../../service/quan-data-calc.service";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css'],
  providers : [QuanDataCalcService]
})
export class BookedComponent implements OnChanges {
  procNumber: number = 0;
  constructor(private calc : QuanDataCalcService, private time : TimeFiltersComponent) {
  }

  ngOnChanges(): void {
    console.log("the fuckkkkk")
    this.setProcNumber();

  }
  setProcNumber() {
    console.log("the fuck")
    console.log(this.time.getNumberOfDays());
    this.procNumber = this.calc.getBookedHoursPercentage(this.time.getNumberOfDays());
  }




}
