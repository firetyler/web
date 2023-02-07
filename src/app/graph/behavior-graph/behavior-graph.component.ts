import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {PriceServiceService} from "../price-service.service";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers: [RoomMapService]

}) @Injectable({
  providedIn: 'root'
})

export class BehaviorGraphComponent {
  @Input() value: any;
  unbooked: number[] = [];
  graphFiler : any[] = [];
  private inputArray: MapRoomEntry[] = [];

  constructor(private mapRoom: RoomMapService,private grapgService : PriceServiceService, private filterService: QuanDataUpdateService, private time: TimeFiltersComponent) {}

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
    this.graphFiler = await this.grapgService.graphFilter(json,array);
    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({type: 'string', id: 'id'});
    dataTable.addColumn({type: 'string', id: 'academy'})
    dataTable.addColumn({type: 'string', id: 'style', role: 'style'});
    dataTable.addColumn({type: 'date', id: 'Start'});
    dataTable.addColumn({type: 'date', id: 'End'});

    for (let i = 0; i <this.graphFiler.length; i++) {

      let date = new Date(this.graphFiler[i].startDate)
      dataTable.addRows([[this.graphFiler[i].id.toString(),
        this.graphFiler[i].academy,
        this.graphFiler[i].color, new Date(this.graphFiler[i].startDate),
        new Date(date.setDate(date.getDate() + 1))]]);
    }




const options = {
  backgroundColor: 'white',
  timeline: {
    colorByRowLabel: false
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
