import { Component } from '@angular/core';
import {FilterSwitchService} from "../service/filter-switch.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  componentName: any;
  constructor(public filterSwitch : FilterSwitchService) {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    if(isAuthenticated){
      window.location.href = '';
    }

  }


  onKey(componentName: string) {
    this.componentName = componentName;
  }

  getKey(){
    return this.componentName;
  }

}
