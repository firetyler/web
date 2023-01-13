import { Component } from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'warn' },
  }]
})
export class MiniHeaderComponent {
  list: any[] = [{name: "Bokningsbeteende"}, {name: "Användningskostnad"}];
  constructor() { }
  ngOnInit(): void {
  }
}
