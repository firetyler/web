import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SeviceService} from "../sevice.service";
import {Month} from "../month";
import {Days} from "../days";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {CsvFileReaderService, Room} from "../../service/csv-file-reader.service";
import {ScheduleEntry, SchemaService} from "../../service/schema.service";
import {GetScheduleDataService} from "../../service/get-schedule-data.service";
import {MapRoomsService, RoomMapEntry} from "../../service/map-rooms.service";
import {CalculationsService} from "../../service/calculations.service";

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
  data : any[] = [];
  arr: any [] = [];
  dataEntry =  this.getSchedule.getScheduleArray();
  dataCsv =  this.csV.getRooms();
  constructor(private csV: CsvFileReaderService, private calc: CalculationsService, private getSchedule: GetScheduleDataService) {
  }

  async ngOnInit() {

    google.charts.load('current', {'packages': ['corechart']});
    await google.charts.setOnLoadCallback( await this.drawChart( await this.dataEntry, await this.dataCsv)); //(await this.sched.getSoapData(new Date())  this is working
    //TODO byt till rätt input till this.drawChart()
  }

  async drawChart(json: ScheduleEntry[],json2:Room[]) {

    for (let i = 0; i < json.length; i++) {
      if (!this.arr.includes(json[i])) {
        this.arr.push(json[i]);
      }

    }
// First index in laptop code is ['ID','date','bookedTime','akademi']
    // second index and come numbers and informations ['99123',Fri Jan 01 2021 00:00:00 GMT+0100 , 2 ,'atm']
    let limit : number = 0
    const carry: any[] = [[{type :'string' ,role:'ID'},{type : 'number', role : 'price'}, { type : 'number',role :'seats'}]]; // never touch
    for (let i = 0; i < json.length; i++) {
      for(let j =0; j<json2.length;j++){
        if (json2[j].id == this.arr[i].room && json2[j].seats != 0){

          // const carry: any[] = [[{role:'ID'},{role : 'startDate'}, {role :'totalHours'}]];
          carry.push([json[i].room,json2[j].price, json2[j].seats]); // [] this is important never forget it
          //  console.log(json[i].startDate);
          //  console.log(json[i].getTestNumber());
      }
      }
    }
    console.log(carry)

    const options = {
      title: '',
      hAxis: {
        title: 'pris',
        format: ' dd mm yyyy'
      },
      vAxis: {title: 'totala timmer'},
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
    this.data = google.visualization.arrayToDataTable(carry);
    const chart = new google.visualization.BubbleChart(<HTMLInputElement>document.getElementById('series_chart_div'));
    chart.draw(this.data, options);

  }


}
