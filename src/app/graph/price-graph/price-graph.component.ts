import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {SearchBarComponent} from "../../filter-bar/component/search-bar/search-bar.component";
import { MiniHeaderComponent } from 'src/app/mini-header/mini-header.component';

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
  constructor(private mapRoom : RoomMapService) {
  }
  async ngOnInit() {

  }
  async onclickPriceGraph(array : any[]){
    await google.charts.load('current', {packages: ['corechart']});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(false),array));
  }

  async drawChart(json: MapRoomEntry[],array: any[]) {

    let carry : any[] = [[{type:'string',role:'id'},{type:'number',role:'totalHours'}
      ,{type:'number',role:'price'},{type:'string',role:'Academy'}
      ,{type:'number',role:'seats'}]];
    for (let i = 0; i < json.length; i++) {
      for(let j = 0; j<array.length; j++){
        let level = json[i].id.toString().substring(0,2) + ':' + json[i].id.toString().substring(2,3);
        let house = json[i].id.toString().substring(0,2);
      if(json[i].academy == array[j]|| json[i].id == array[j] || level == array[j] || house == array[j] ){
        carry.push([json[i].id.toString(), json[i].getTotalHours(),json[i].price*json[i].getTotalHours(),json[i].academy,json[i].seats]);
      }
    }
      if(array.length == 0){
        carry.push([json[i].id.toString(), json[i].getTotalHours(),json[i].price*json[i].getTotalHours(),json[i].academy,json[i].seats]);
      }
    }

    const options = {
      backgroundColor: 'white',
      hAxis: {title: 'Totala bokade timmar'},
      vAxis: {title: 'Totalt boknings pris'},
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
