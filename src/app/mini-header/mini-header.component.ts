import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class MiniHeaderComponent implements OnChanges {
  
  selection: any[] = ["Bokningsbeteende", "Användningskostnad"];
  test:any ;
  constructor(private main: AppComponent) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.onSelect(changes);
  }
  onSelect(alt: any){
    this.main.onKey(alt);
    return this.test = alt;
  }

  async getSelectionBokningsbeteende(){ 
  return  "Bokningsbeteende"
  }

  async getSelectionAnvändningskostnad(){
    return "Användningskostnad"
  }

  triggerMethod(){
    if(this.test == 'Bokningsbeteende'){
      return  this.getSelectionBokningsbeteende()
      }else{
        return  this.getSelectionAnvändningskostnad()
      }
  }
}

export class miniHeaderEntry {
  miniHeader:any
  constructor(miniHeader: any) {
    this.miniHeader = miniHeader;
  }

}
