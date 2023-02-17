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
export class MiniHeaderComponent {

  constructor(private main: AppComponent) {
  }

  async onSelect(alt: string) {
    this.main.onKey(alt);
  }

  async getGraph(){
    return this.main.getKey();
  }
}

