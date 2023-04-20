import {Component, OnInit} from '@angular/core';
import {RoomFilterService} from "../room-filter.service";
import {RoomEntry} from "../../service/csv-file-reader.service";

@Component({
  selector: 'app-unbooked-rooms',
  templateUrl: './unbooked-rooms.component.html',
  styleUrls: ['./unbooked-rooms.component.css']
})
export class UnbookedRoomsComponent implements OnInit{
  numberOfUnbookedRooms: number = 0;
  unbookedArray: RoomEntry[] = [];

  constructor(private unbookedService: RoomFilterService) {}
  ngOnInit() {
    this.unbookedService.currentUnbookedRooms.subscribe(item => {
      this.unbookedArray = item;
    });
    this.unbookedService.currentNumberOfUnbooked.subscribe(num => {
      this.numberOfUnbookedRooms = num;
    });
  }

}
