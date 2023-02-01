import {Component, Injectable, OnInit} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'warn' },
  }]
})
@Injectable({
  providedIn: 'root'
})
export class MiniHeaderComponent implements OnInit {
  selection: any[] = ["Bokningsbeteende", "Användningskostnad"];
  test:miniHeaderEntry[]=[];
  constructor(private main: AppComponent) { }

  async ngOnInit() {
  }
  onSelect(alt: any) {
 this.main.onKey(alt);

    if(alt == 'Bokningsbeteende'){
    return  this.test?.push(new miniHeaderEntry("Bokningsbeteende"))

    }else {
      return  this.test?.push(new miniHeaderEntry("Användningskostnad"))

    }

  }

  async getSelection(){
  return this.test
  }



}

export class miniHeaderEntry {
  miniHeader:any
  constructor(miniHeader: any) {
    this.miniHeader = miniHeader;
  }

}
