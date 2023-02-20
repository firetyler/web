import {Component} from '@angular/core';
import {MainComponent} from "../main/main.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private main: MainComponent) {
  }
  onSelect(alt: string){
    this.main.onKey(alt);
  }

}
