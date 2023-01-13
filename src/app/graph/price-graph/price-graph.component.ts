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
    await google.charts.setOnLoadCallback(this.drawChart(await this.sched.getSoapData(new Date())));
    //TODO byt till rätt input till this.drawChart()
  }

  async drawChart(json: ScheduleEntry[]) {

// First index in laptop code is ['ID','date','bookedTime','akademi']
    // second index and come numbers and informations ['99123',Fri Jan 01 2021 00:00:00 GMT+0100 , 2 ,'atm']
   let limit : number = 0
   const carry: any[] = [[{type :'string' ,role:'ID'},{type : 'number', role : 'startDate'}, { type : 'number',role :'totalHours'}]];
    for (let i = 0; i < json.length; i++) {
        if (json[i].room  !=limit){
         // const carry: any[] = [[{role:'ID'},{role : 'startDate'}, {role :'totalHours'}]];
          carry.push([json[i].room,json[i].getTestNumber(), json[i].getTotalHours()]);
        //  console.log(json[i].startDate);
        //  console.log(json[i].getTestNumber());
        }else{

        }


    }
   // console.log(carry);
    // console.log(carry);

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
    const data = google.visualization.arrayToDataTable(carry);
    const chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw( data, options);
  }


}
