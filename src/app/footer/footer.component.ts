import { Component } from '@angular/core';
import {DocumentationsComponent} from "./documentations/documentations.component";
import {Router} from "@angular/router";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [DocumentationsComponent]
})
export class FooterComponent {
  constructor(private router:Router,private main: AppComponent){}
  onClicAbout(){
    this.main.onKey("about")
  }
  onClickDocumentations(){
    this.main.onKey("documentations")
  }
}
