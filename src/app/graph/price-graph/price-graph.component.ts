import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {SearchBarComponent} from "../../filter-bar/component/search-bar/search-bar.component";

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
  constructor(private mapRoom : RoomMapService, private searchBar : SearchBarComponent) {
  }

  async ngOnInit() {
   await google.charts.load('current', {packages: ['corechart']});
   await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(false),this.searchBar.geDataSet()));
  }

  async drawChart(json: MapRoomEntry[], j : any[]) {
    let carry : any[] = [['id','totalHours','price','Academy','seats']];
    console.log(j)
    for (let i = 0; i < json.length; i++) {
      carry.push([json[i].id.toString(), json[i].getTotalHours(),json[i].price,json[i].academy,json[i].seats]);
      console.log()
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
        maxZoomIn: 4.0
      }
    };
    let data = google.visualization.arrayToDataTable(carry);
    const chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
    chart.draw(data, options);

  }
}
