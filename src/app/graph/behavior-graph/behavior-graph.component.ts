import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers: [RoomMapService]

}) @Injectable({
  providedIn: 'root'
})

export class BehaviorGraphComponent implements OnInit {
  @Input() value: any;
  unbooked: number[] = [];

  private inputArray: MapRoomEntry[] = [];

  constructor(private mapRoom: RoomMapService, private filterService: QuanDataUpdateService, private time: TimeFiltersComponent) {
  }

  async ngOnInit() {}

  async onclickBehavGraph(array: any[]) {
    await google.charts.load("current", {packages: ["timeline"]});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(true), array));
  }

  changeDateFilter(dateFilter: number) {
    this.filterService.changeDateFilter(dateFilter);
  }

  async drawChart(json: MapRoomEntry[], array: any[]) {
    this.filterService.setArray([...json]);
    this.inputArray = [...json];
    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({type: 'string', id: 'id'});
    dataTable.addColumn({type: 'string', id: 'academy'})
    dataTable.addColumn({type: 'string', id: 'style', role: 'style'});
    dataTable.addColumn({type: 'date', id: 'Start'});
    dataTable.addColumn({type: 'date', id: 'End'});
    for (let i = 0; i < json.length; i++) {
      for (let j = 0; j <= array.length; j++) {
        let level = json[i].id.toString().substring(0, 2) + ':' + json[i].id.toString().substring(2, 3);
        let house = json[i].id.toString().substring(0, 2);
        if (json[i].academy == array[j] || json[i].id == array[j] || level == array[j] || house == array[j]) {
          let date = new Date(json[i].startDate)
          dataTable.addRows([[json[i].id.toString(), json[i].academy, json[i].color, new Date(json[i].startDate), new Date(date.setDate(date.getDate() + 1))]]);
        }
      }
      if (array.length == 0) {
        let date = new Date(json[i].startDate)
        dataTable.addRows([[json[i].id.toString(), json[i].academy, json[i].color, new Date(json[i].startDate), new Date(date.setDate(date.getDate() + 1))]]);
      }
    }
    const options = {
      backgroundColor: 'white',
      timeline: {
        colorByRowLabel: false,
      },
    };
    chart.draw(dataTable, options);
    this.setUnbookedRooms();
    this.changeDateFilter(this.filterService.numberOfDays);
  }

  getInputArray() {
    return this.inputArray;
  }

  setUnbookedRooms() {
    this.unbooked = this.mapRoom.listRoomsUnbooked;
  }

}
