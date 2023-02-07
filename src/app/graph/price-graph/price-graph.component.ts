import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {SearchBarComponent} from "../../filter-bar/component/search-bar/search-bar.component";
import { MiniHeaderComponent } from 'src/app/mini-header/mini-header.component';
import {RoomFilterService} from "../room-filter.service";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";

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
export class PriceGraphComponent {
  @Input() value: any;
  graphFiler : any[] = [];
  constructor(private mapRoom : RoomMapService, private graphService : RoomFilterService, private filterService: QuanDataUpdateService) {
  }
  async onclickPriceGraph(array : any[]){
    await google.charts.load('current', {packages: ['corechart']});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(false),array));
  }

  changeDateFilter(dateFilter: number) {
    this.filterService.changeDateFilter(dateFilter);
  }

  async drawChart(json: MapRoomEntry[],array: any[]) {
    this.graphFiler = await this.graphService.graphFilter(json,array);
    this.filterService.setArray([...this.graphFiler]);
    let carry : any[] = [[{type:'string',role:'id'},{type:'number',role:'totalHours'}
      ,{type:'number',role:'price'},{type:'string',role:'Academy'}
      ,{type:'number',role:'seats'}]];
    for (let i =0; i < this.graphFiler.length; i++){
      carry.push([this.graphFiler[i].id, this.graphFiler[i].getTotalHours()
        ,this.graphFiler[i].price*this.graphFiler[i].getTotalHours(),this.graphFiler[i].academy,this.graphFiler[i].seats]);
    }
    const options = {
      backgroundColor: 'white',
      hAxis: {title: 'Totala bokade timmar'},
      vAxis: {title: 'Totalt bokningspris'},
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
        maxZoomIn: 16.0
      }
    };
    let data = google.visualization.arrayToDataTable(carry);
    const chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);
    this.changeDateFilter(this.filterService.numberOfDays);
  }
}
