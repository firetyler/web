import {Component, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers : [RoomMapService]

})
export class BehaviorGraphComponent implements OnInit{
  @Input() value : any;

  private inputArray : MapRoomEntry[] = [];

  constructor(private mapRoom : RoomMapService) {
  }
  async ngOnInit() {
    await google.charts.load("current", {packages:["timeline"]});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(true)));
  }

  async drawChart(json: MapRoomEntry[]){
    this.inputArray = [...json];

    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({type : 'string' , id : 'academy'})
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    for(let i =0; i<json.length; i++){
      let date = new Date(json[i].startDate)
      dataTable.addRows([[json[i].id.toString(),json[i].academy,json[i].color,new Date(json[i].startDate),new Date(date.setDate(date.getDate() +1))]]);
    }

    const options = {
      backgroundColor: 'white',
      timeline : {
        colorByRowLabel : false
      },

    };

    chart.draw(dataTable,options);
  }

  getInputArray(){
    return this.inputArray;
  }

}
