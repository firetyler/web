import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {SchemaService} from "../schema.service"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  xmlData: any;
  ObjectKeys: any = Object.keys;
  constructor(private schemaService: SchemaService) { }
  ngOnInit() {
    this.xmlData = this.schemaService.getSoapData();
  }
}
