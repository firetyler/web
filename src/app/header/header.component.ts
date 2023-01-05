import {Component} from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  constructor(private location: Location) { }
  onSwitchAkademi() {
    this.location.replaceState('/Akademi')
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
