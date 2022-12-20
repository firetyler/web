import {Component, OnInit} from '@angular/core';
import {SchemaService} from "../service/schema.service"
import {RoomService} from "../service/room.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/*export class HeaderComponent implements OnInit {
  xmlData: any;
  ObjectKeys: any = Object.keys;
  constructor(private schemaService: SchemaService) { }
  ngOnInit() {
    this.xmlData = this.schemaService.getSoapData();
  }
}*/

export class HeaderComponent implements OnInit {
  xmlData: any;
  constructor(private roomService: RoomService) { }
  ngOnInit() {
    this.xmlData = this.roomService.getRoomsService();
  }
}
