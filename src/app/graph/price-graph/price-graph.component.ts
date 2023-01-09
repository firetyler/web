import {Component, Input, OnInit} from '@angular/core';
import {SeviceService} from "../sevice.service";
import {Month} from "../month";
import {Days} from "../days";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";

declare var google: any;

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})
export class PriceGraphComponent implements OnInit {
  @Input() value : any;
  private img: any;
  constructor(private service : SeviceService) {
  }

  ngOnInit(): void {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }

  async drawChart(json : any) {
    const jsonn = [
      {'ID' : "99123" , 'Date' : new Date(2020,12,1), 'bookedTime' : 2, 'akademi' : "atm"}];
    const  carray :any[] = [['ID', 'date','bookedTime','akademi']];

    for (let i = 0;i < jsonn.length;i++){
      carray.push([jsonn[i].ID, jsonn[i].Date,jsonn[i].bookedTime, jsonn[i].akademi]);
    }

    const data = google.visualization.arrayToDataTable(carray);
    const options = {
      title: '',
      hAxis: {title: 'dagar',
        format : ' dd mm yyyy'
      },
      vAxis: {title: 'timmar'},
      bubble: {
        textStyle: {fontSize: 13},
        fontName: 'Times-Roman',
        colors: 'black',
        italic: true
      },
      gridlines: {
        count: -1,
        units: {
          days: {format: ['MMM dd']},
          hours: {format: ['HH:mm', 'ha']},
        }
      },
    };

    const chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);
  }
}
