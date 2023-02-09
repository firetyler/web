import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import {FilterSwitchService} from "../service/filter-switch.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  list: string[] = ['Akademi', 'hus', 'våning', 'rum'];

  constructor(private filterSwitch: FilterSwitchService) { }

  ngOnInit(): void {
  }
  setSelectedComponent(selectedComponent : string){
    this.filterSwitch.selectedComponent = selectedComponent;
  }


}
