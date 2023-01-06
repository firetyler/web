
import { Location } from '@angular/common';


import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  list: string[] = ['Akademi', 'hus', 'våning', 'rum'];

  ngOnInit(): void {
  }

  constructor(private location: Location) { }

  onSwitchHomePage() {
    this.location.replaceState('')
    location.reload();
  }
  onSwitchAkademi() {
    this.location.replaceState('/Academy')
    location.reload();
  }
  onSwitchHus() {
    this.location.replaceState('/Hus')
    location.reload();
  }

  onSwitchLevel() {
    this.location.replaceState('/Level')
    location.reload();
  }

  onSwitchRoom() {
    this.location.replaceState('/Room')
    location.reload();
  }
}
