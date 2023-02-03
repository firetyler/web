import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers : [RoomMapService]

})@Injectable({
  providedIn: 'root'
})

export class BehaviorGraphComponent implements OnInit{
  @Input() value : any;

  private inputArray : MapRoomEntry[] = [];
  unbooked: number[] = [];

  constructor(private mapRoom : RoomMapService, private filterService: QuanDataUpdateService,private time:TimeFiltersComponent) {
  }
  async ngOnInit() {
    await google.charts.load("current", {packages:["timeline"]});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(true)));
  }
  changeDateFilter(dateFilter: number) {
    this.filterService.changeDateFilter(dateFilter);
  }
  async drawChart(json: MapRoomEntry[]){
    this.filterService.setArray([...json]);

    console.log(this)
    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({type : 'string' , id : 'academy'})
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    for(let i =0; i<json.length; i++){
      let date = new Date(json[i].startDate)
      dataTable.addRows([[json[i].id.toString(),json[i].academy,'color:'+ json[i].color,new Date(json[i].startDate),new Date(date.setDate(date.getDate() +1))]]);
    }
    const options = {
      backgroundColor: 'white',
      timeline : {
        colorByRowLabel : false,
      },
    };
    chart.draw(dataTable,options);
    this.setUnbookedRooms();
    console.log("Beteende grafen : " + this.filterService.numberOfDays)
    this.changeDateFilter(this.filterService.numberOfDays);

  }

  getInputArray(){
    return this.inputArray;
  }
  setUnbookedRooms() {
    this.unbooked = this.mapRoom.listRoomsUnbooked;
  }

}
