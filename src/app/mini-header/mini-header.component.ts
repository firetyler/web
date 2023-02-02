import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'warn'},
  }]
})
@Injectable({
  providedIn: 'root'
})
export class MiniHeaderComponent implements OnChanges {

  selection: any[] = ["Bokningsbeteende", "Användningskostnad"];
  test: any[] = [];
  graphType: string = "";

  constructor(private main: AppComponent) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  /*onSelect(e:any){
    this.main.onKey(e.target.innerHTML);
    if (!this.test.includes(e.target.innerHTML)) {
      this.test.push(e.target.innerHTML)
    }
  }*/

  async getSelectionBookningDescriptions() {
    this.graphType = "Bokningsbeteende";
    this.main.onKey(this.graphType)
    return this.graphType
  }

  async getSelectionPriceUsage() {
    this.graphType = "Användningskostnad";
    this.main.onKey(this.graphType)
    return this.graphType;

  }

  async getGraphType() {
    return this.graphType
  }
}

