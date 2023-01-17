import {Component, Input, OnInit} from '@angular/core';
import {BehaviorService} from 'src/app/service/behavior.service';
import {ScheduleEntry} from "../../service/schema.service";
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

  constructor(private mapRoom : RoomMapService) {
  }
  async ngOnInit() {
    //console.log(this.behavior.getRoomBehavior());
    await google.charts.load("current", {packages:["timeline"]});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms()));
  }

  async drawChart(json: MapRoomEntry[]){

    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({type : 'string' , id : 'academy'})
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });




//console.log(this.behavior.getRoomBehavior());
    for(let i =0; i<json.length; i++){
      dataTable.addRows([[json[i].id.toString(),json[i].academy,json[i].color,new Date(json[i].startDate),new Date(json[i].endDate)]]);
    }

    const options = {
      backgroundColor: 'white',
      title: '',
      'width':800,
      'height':800,
      timeline : {
        colorByRowLabel : false
      },

    };

    chart.draw(dataTable,options);
  }

}
