import {Component} from '@angular/core';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private main: AppComponent) {
  }
  onSelect(alt: string){
    this.main.onKey(alt);
  }

}
