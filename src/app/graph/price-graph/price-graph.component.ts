import {Component, OnInit} from '@angular/core';
import {SeviceService} from "../sevice.service";
import {Month} from "../month";
import {Days} from "../days";

declare var google: any;

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})
export class PriceGraphComponent implements OnInit {

  constructor(private service : SeviceService) {
  }

  ngOnInit(): void {
    google.charts.load('current', {'packages': ['corechart']});
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart() {
    const data = google.visualization.arrayToDataTable([
      ['ID', 'date', 'bokandeTimmar', 'akademi', 'totaltid'],
      ['29111', 12, 2, 'ATM', 33739900],


    ]);
    const options = {
      title: '',
      hAxis: {title: 'dagar'},
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
