import {Component, Input, OnInit} from '@angular/core';
import {SeviceService} from "../sevice.service";
import {Month} from "../month";
import {Days} from "../days";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {CsvFileReaderService} from "../../service/csv-file-reader.service";
import {ScheduleEntry, SchemaService} from "../../service/schema.service";

declare var google: any;

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css']
})
export class PriceGraphComponent implements OnInit {
  @Input() value: any;
  rooms: any[] = [];
  carry: any[] = [];

  constructor(private service: SeviceService, private room: CsvFileReaderService, private sched : SchemaService) {
  }

  async ngOnInit() {

    google.charts.load('current', {'packages': ['corechart']});
    await google.charts.setOnLoadCallback(this.drawChart(await this.sched.getSoapData("","")));
  }

  async drawChart(json: ScheduleEntry[]) {
    let carry: any[] = [['ID', 'totalHours', 'startDate', 'startTime', 'endTime']];
    for (let i = 0; i < json.length; i++) {

      this.carry.push([json[i].room, json[i].getTotalHours(), json[i].getTestNumber(), json[i].getTestNumber(), json[i].getTestNumber()]);

    }
    console.log(this.carry);
    // console.log(carry);
    const data = google.visualization.arrayToDataTable((carry));
    const options = {
      title: '',
      hAxis: {
        title: 'dagar',
        format: ' dd mm yyyy'
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
    chart.draw( data, options);
  }


}
