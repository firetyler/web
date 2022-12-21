import {Component, OnInit} from '@angular/core';
import {SchemaService} from "../service/schema.service"
import {CsvFileReaderService} from "../service/csv-file-reader.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/*export class HeaderComponent implements OnInit {
  xmlData: any;
  constructor(private schemaService: SchemaService) { }
  ngOnInit() {
    this.xmlData = this.schemaService.getSoapData();
  }
}*/

export class HeaderComponent implements OnInit {
  xmlData: any;
  constructor(private csvFile : CsvFileReaderService) { }
  ngOnInit() {
    this.csvFile.getRooms();
  }
}
