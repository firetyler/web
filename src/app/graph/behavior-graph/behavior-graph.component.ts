import {Component, Input, OnInit} from '@angular/core';
import {Behavior, Behavior2Service} from 'src/app/service/behavior2.service';
import {ScheduleEntry} from "../../service/schema.service";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers : [Behavior2Service]

})
export class BehaviorGraphComponent implements OnInit{
  @Input() value : any;

  constructor(private behavior: Behavior2Service) {
  }
  ngOnInit() {
    //console.log(this.behavior.getRoomBehavior());
    google.charts.load("current", {packages:["timeline"]});
    google.charts.setOnLoadCallback(this.drawChart(this.behavior.getRoomBehavior()));
  }

  drawChart(json : Behavior[]){

    var chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({type : 'string' , id : 'corses'})
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });


//console.log(this.behavior.getRoomBehavior());
    for(let i =0; i<json.length; i++){
      dataTable.addRows([[json[i].room.toString(),json[i].course,json[i].color,json[i].startDate,json[i].endDate]]);
    }

    var options = {
      timeline : {
        colorByRowLabel : false
      }
    };

    chart.draw(dataTable,options);
  }

}
