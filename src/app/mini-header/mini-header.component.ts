import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {AppComponent} from "../app.component";
import {MainComponent} from "../main/main.component";
import {SearchBarComponent} from "../filter-bar/component/search-bar/search-bar.component";

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
export class MiniHeaderComponent {

  constructor(private main: MainComponent) {
  }

  async onSelect(alt: string) {
    this.main.onKey(alt);
  }

  async getGraph(){
    return this.main.getKey();
  }
  /*async submitFunction(){
    await this.filter.submitFunction();
  }*/
}

