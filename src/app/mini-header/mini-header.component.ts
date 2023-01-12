import { Component } from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class MiniHeaderComponent {
  list: any[] = ["Bokningsbeteende ", "Användningskostnad "];
  constructor() { }
  ngOnInit(): void {
  }
}
