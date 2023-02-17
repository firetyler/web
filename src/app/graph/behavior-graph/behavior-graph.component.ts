import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Injectable,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {MapRoomEntry, RoomMapService} from "../../service/room-map.service";
import {QuanDataUpdateService} from "../../quanData/quan-data/quan-data-update.service";
import {RoomFilterService} from "../room-filter.service";
import {CsvFileReaderService, RoomEntry} from "../../service/csv-file-reader.service";

declare var google: any;

@Component({
  selector: 'app-behavior-graph',
  templateUrl: './behavior-graph.component.html',
  styleUrls: ['./behavior-graph.component.css'],
  providers: [RoomMapService]

}) @Injectable({
  providedIn: 'root'
})


export class BehaviorGraphComponent implements DoCheck, OnChanges {


  @Input() value: any;
  graphFiler: any[] = [];
  @Input() unbookedArray: number[] = [];
  @Input() numberOfUnbookedRooms: number = 0;
  private changeDetected: boolean = false;


  constructor(private mapRoom: RoomMapService, private graphService: RoomFilterService, private filterService: QuanDataUpdateService,
              private roomReader: CsvFileReaderService, private cd: ChangeDetectorRef, private appRef: ApplicationRef) {
  }

  async ngOnChanges(changes: SimpleChanges) {
        await this.ngDoCheck();
    }

  async onclickBehavGraph(array: any[]) {
    await google.charts.load("current", {packages: ["timeline"]});
    await google.charts.setOnLoadCallback(this.drawChart(await this.mapRoom.mapRooms(true), array));
    await this.setUnbookedRooms();
    await this.ngDoCheck();
  }

  changeDateFilter(dateFilter: number) {
    this.filterService.changeDateFilter(dateFilter);
  }

  async drawChart(json: MapRoomEntry[], array: any[]) {
    this.graphFiler = await this.graphService.graphFilter(json, array);
    this.filterService.setArray([...this.graphFiler]);
    let chart = new google.visualization.Timeline(document.getElementById('behavior_graph'));
    let dataTable = new google.visualization.DataTable();
    dataTable.addColumn({type: 'string', id: 'id'});
    dataTable.addColumn({type: 'string', id: 'academy'})
    dataTable.addColumn({type: 'string', id: 'style', role: 'style'});
    dataTable.addColumn({type: 'date', id: 'Start'});
    dataTable.addColumn({type: 'date', id: 'End'});
    for (let i = 0; i < this.graphFiler.length; i++) {
      let date = new Date(this.graphFiler[i].startDate)
      dataTable.addRows([[this.graphFiler[i].id.toString(),
        this.graphFiler[i].academy,
        this.graphFiler[i].color, new Date(this.graphFiler[i].startDate),
        new Date(date.setDate(date.getDate() + 1))]]);
    }
    const options = {
      backgroundColor: 'white',
      timeline: {
        colorByRowLabel: false
      },
    };
    chart.draw(dataTable, options);
    this.changeDateFilter(this.filterService.numberOfDays);
  }

  async setUnbookedRooms() {
    this.unbookedArray = [];
    let roomExists = false;
    let rooms = await this.roomReader.getRooms();
    let tempArray = await this.graphService.graphFilter(rooms,this.filterService.getFilterDataset());
    for (let i = 0; i < tempArray.length; i++) {
      for (let j = 0; j < this.graphFiler.length; j++) {

        if (tempArray[i].id == this.graphFiler[j].id) {
          roomExists = true;
        }
      }
      if(!roomExists) {
        this.unbookedArray.push(tempArray[i].id);
      }
      roomExists = false;
    }
    this.numberOfUnbookedRooms = this.unbookedArray.length;
    this.cd.detectChanges();
    this.appRef.tick();
  }
  async ngDoCheck() {
    if (this.unbookedArray.length > 0) {
      console.log(this.unbookedArray.length + " Längden")
      this.changeDetected = true;
      this.cd.detectChanges();
      this.appRef.tick();
    }

  }


}
