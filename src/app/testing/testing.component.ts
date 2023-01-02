import { Component, OnInit } from '@angular/core';
import {SchemaService} from "../service/schema.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {
  json: any;
  constructor(private service : SchemaService) {}

  ngOnInit(): void {
    console.log(this.service.getSoapData("",""));
  }
}
