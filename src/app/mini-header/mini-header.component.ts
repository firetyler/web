import {Component, Injectable} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'default' },
  }]
})
@Injectable({
  providedIn: 'root'
})
export class MiniHeaderComponent {
  selection: any[] = ["Bokningsbeteende", "Användningskostnad"];
  constructor(private main: AppComponent) { }

  onSelect(alt: any) {
    this.main.onKey(alt);
  }
}
