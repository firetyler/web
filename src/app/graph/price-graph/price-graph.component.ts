import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {SearchBarComponent} from "../../filter-bar/component/search-bar/search-bar.component";
import { MiniHeaderComponent } from 'src/app/mini-header/mini-header.component';
import {PriceServiceService} from "../price-service.service";

declare var google: any;
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css'],
  providers : [RoomMapService,SearchBarComponent]
})
export class PriceGraphComponent implements OnInit {
  @Input() value: any;
  constructor(private mapRoom : RoomMapService,private grapgService : PriceServiceService) {
  }
//Hello
  async ngOnInit() {

  }
  async onclickPriceGraph(array : any[]){
    await google.charts.load('current', {packages: ['corechart']});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(false),array));
  }

  async drawChart(json: MapRoomEntry[],array: any[]) {

    let carry: any[] = [[{type: 'string', role: 'id'}, {type: 'number', role: 'totalHours'}
      , {type: 'number', role: 'price'}, {type: 'string', role: 'Academy'}
      , {type: 'number', role: 'seats'}]];

    carry.push(this.grapgService.grafFilter(json,array));
    const options = {
      backgroundColor: 'white',
      hAxis: {title: 'Totala timmar'},
      vAxis: {title: 'Pris'},
      bubble: {
        textStyle: {fontSize: 12},
        fontName: 'Times-Roman',
        colors: 'black',
        border: 'black',
        italic: true
      },
      gridlines: {
        count: -1,
        units: {
          days: {format: ['MMM dd']},
          hours: {format: ['HH:mm', 'ha']},
        }
      },
      explorer: {
        axis: 'horizontal',
        keepInBounds: true,
        maxZoomIn: 12.0
      }
    };
    let data = google.visualization.arrayToDataTable(carry);
    const chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);

  }
}
