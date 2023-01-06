import { Component } from '@angular/core';

@Component({
  selector: 'app-mini-header',
  templateUrl: './mini-header.component.html',
  styleUrls: ['./mini-header.component.css']
})
export class MiniHeaderComponent {
  showchild1: boolean = false;
  showchild2: boolean = false;
  constructor() { }
  ngOnInit(): void {
  }

  showGraph1(){
    this.showchild1= true;
    this.showchild2=false;
  }

  showGraph2(){
    this.showchild2= true;
    this.showchild1=false;
  }
}
