import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  list: string[] = ['Akademi', 'hus', 'våning', 'rum'];

  constructor(private location: Location) { }
  onSwitchAkademi() {
    this.location.replaceState('/Academy')
    location.reload();
  }
  ngOnInit(): void {
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
