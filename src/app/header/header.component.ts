import {Component, OnInit} from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  list: string[] = ['Akademi', 'hus', 'våning', 'rum'];
  constructor() {
  }

  ngOnInit(): void {
  }


}
