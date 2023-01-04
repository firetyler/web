import {Component, Input, OnInit} from '@angular/core';
import {SeviceService} from "../sevice.service";
import {Month} from "../month";
import {Days} from "../days";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {CsvFileReaderService} from "../../service/csv-file-reader.service";

declare var google: any;

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})
export class PriceGraphComponent implements OnInit {
  @Input() value : any;
  rooms : any[] = [];
  carry : any[] = [];
  constructor(private service : SeviceService,private room : CsvFileReaderService) {
  }

  async ngOnInit(){

    google.charts.load('current', {'packages': ['corechart']});
   await google.charts.setOnLoadCallback(this.drawChart( await this.room.getRooms()));
  }

   async drawChart(json : any) {
    let  carry :any[] = [['ID', 'course','startDate','startTime','endTime']];

    for (let i = 0;i < json.length;i++){

    this.carry.push([json[i].ID, json[i].course,json[i].startDate, json[i].startTime,json[i].endTime]);

    }
     console.log(this.carry);
   // console.log(carry);
    const data = google.visualization.arrayToDataTable(this.carry);
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
