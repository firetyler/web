import { Component, Input } from '@angular/core';
import {BehaviorService} from "../../behavior.service";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css']
})
export class BehaviorGraphComponent {
  @Input() value : any;

  constructor(private behavior: BehaviorService){
  }

  ngOnInit(): void {
    google.charts.load("current", {packages:["timeline"]});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  drawChart(json : any){
    var chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    var dataTable = new google.visualization.dataTable();
    var options = {};
    /*const jsonn = [
      {'ID' : "99123" ,style : '#ff0000', 'Date' : new Date(2020,12,1)}];

    const  col :any[] = [['ID', 'style', 'date']];

    for (let i = 0;i < jsonn.length;i++){
      col.push([jsonn[i].ID, jsonn[i].style,  jsonn[i].Date]);
    }
    var dataTable = new google.visualization.arrayToDataTable(col);



    var options = {
      title: 'Beteende',
      hAxis: {title: 'dagar',
        format : ' dd mm yyyy'
      },
      vAxis: {title: 'room'},

      gridlines: {
        count: -1,
        units: {
          days: {format: ['MMM dd']},
          hours: {format: ['HH:mm', 'ha']},
        }
      },
    };*/


    /* //här blir dagar veckor för start och end
    dataTable.addColumn({ type: 'String', id: 'Room' });
    dataTable.addColumn({ type: 'string', id: 'style', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });

    dataTable.addRows([

    ]);*/
    /* dataTable.addColumn({ type: 'string', id: 'Room' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
      [ 'Magnolia Room',  'CSS Fundamentals',    new Date(0,0,0,12,0,0),  new Date(0,0,0,14,0,0) ],
      [ 'Magnolia Room',  'Intro JavaScript',    new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
      [ 'Magnolia Room',  'Advanced JavaScript', new Date(0,0,0,16,30,0), new Date(0,0,0,19,0,0) ],
      [ 'Gladiolus Room', 'Intermediate Perl',   new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Gladiolus Room', 'Advanced Perl',       new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
      [ 'Gladiolus Room', 'Applied Perl',        new Date(0,0,0,16,30,0), new Date(0,0,0,18,0,0) ],
      [ 'Petunia Room',   'Google Charts',       new Date(0,0,0,12,30,0), new Date(0,0,0,14,0,0) ],
      [ 'Petunia Room',   'Closure',             new Date(0,0,0,14,30,0), new Date(0,0,0,16,0,0) ],
      [ 'Petunia Room',   'App Engine',          new Date(0,0,0,16,30,0), new Date(0,0,0,18,30,0) ]]);*/


    chart.draw(dataTable, options);
  }

}
