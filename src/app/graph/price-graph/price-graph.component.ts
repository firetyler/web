import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {SearchBarComponent, SearchRoomEntry} from "../../filter-bar/component/search-bar/search-bar.component";


declare var google: any;

@Component({
  selector: 'app-price-graph',
  templateUrl: './price-graph.component.html',
  styleUrls: ['./price-graph.component.css'],
  providers : [RoomMapService,SearchBarComponent]
})
@Injectable({
  providedIn: 'root'
})
export class PriceGraphComponent implements OnInit {
  @Input() value: any;

  constructor(private mapRoom: RoomMapService,private mapSearch: SearchBarComponent) {

  }

  async ngOnInit() {
    await google.charts.load('current', {packages: ['corechart']});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(false)
    ,await this.mapSearch.getPdataset()));
  }

  async drawChart(json: MapRoomEntry[], room:any[]) {
    console.log(room[0])


    let carry: any[] = [[{type: 'string', role: 'id'}, {type: 'number', role: 'totalHours'}, {
      type: 'number',
      role: 'price'
    }, {type: 'string', role: 'Academy'}, {type: 'number', role: 'seats'}]];
    for (let i = 0; i < json.length; i++) {

       // for(let j = 0; j < room.length ; j++){
       //   console.log(room[j].room);
      // console.log(this.search)
      //if(this.search[j] == json[i].id){
      carry.push([json[i].id.toString(), json[i].getTotalHours(), json[i].price, json[i].academy, json[i].seats]);
  //    this.ngOnInit()
      // }
    //}

}
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
