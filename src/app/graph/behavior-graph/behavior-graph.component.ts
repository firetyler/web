import {ChangeDetectorRef, Component, DoCheck, Injectable, Input, OnChanges, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {RoomFilterService} from "../room-filter.service";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers: [RoomMapService]

}) @Injectable({
  providedIn: 'root'
})



export class BehaviorGraphComponent implements DoCheck {


  @Input() value: any;
  unbooked: any[] = [];
  graphFiler: any[] = [];
  hidden: boolean = false;
   tempArray : number[] =[];
  private changeDetected: boolean =false;


  constructor(private mapRoom: RoomMapService, private grapgService: RoomFilterService, private filterService: QuanDataUpdateService) {
  }



  async onclickBehavGraph(array: any[]) {
    await google.charts.load("current", {packages: ["timeline"]});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(true), array));
    await this.setUnbookedRooms()
    await this.ngDoCheck()
  }

  changeDateFilter(dateFilter: number) {
    this.filterService.changeDateFilter(dateFilter);
  }

  async drawChart(json: MapRoomEntry[], array: any[]) {
    this.graphFiler = await this.grapgService.graphFilter(json, array);
    this.filterService.setArray([...this.graphFiler]);
    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({type: 'string', id: 'id'});
    dataTable.addColumn({type: 'string', id: 'academy'})
    dataTable.addColumn({type: 'string', id: 'style', role: 'style'});
    dataTable.addColumn({type: 'date', id: 'Start'});
    dataTable.addColumn({type: 'date', id: 'End'});
    for (let i = 0; i < this.graphFiler.length; i++) {
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
    this.changeDateFilter(this.filterService.numberOfDays);
  }

  async setUnbookedRooms() {

 for(let i = 0; i<this.mapRoom.listRoomsUnbooked.length;i++){
   this.tempArray.push(this.mapRoom.listRoomsUnbooked[i])
 }
    console.log(this.tempArray)
    return this.tempArray;
  }

 async ngDoCheck() {
    if(this.tempArray.length > 0){
      this.changeDetected = true;
    }

  }


}
