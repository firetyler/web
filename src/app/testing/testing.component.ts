import { Component } from '@angular/core';
import {Schema2Service} from "../service/schema2.service";

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
  constructor(private service : Schema2Service) {
    console.log(this.service.getSoapData());
  }
}
