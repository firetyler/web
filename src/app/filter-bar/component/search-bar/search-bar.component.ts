import { Component } from '@angular/core';
import * as Http from "http";
import {style} from "@angular/animations";


//https://mdbootstrap.com/docs/b4/angular/forms/search/
//https://stackoverflow.com/questions/53756451/angular-7-error-rangeerror-maximum-call-stack-size-exceeded
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  show = false
  elementClicked = 'Click any of the list item below'

  searchText: any;
  dataset: any = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue', 'help', 'fly', 'dance', 'lila'];
  pDataset: any = [];
  UniqSet: any = [];

  // Fake API URL
  url: string = 'https://jsonplaceholder.typicode.com/users';
  usersArray: Array<any> = [];

  // @ts-ignore
  onClick(e) {
    this.elementClicked = 'Last clicked: ' + e.target.innerHTML;


    //funciton to stop taking the same choice Require help with algorithim
    if (this.pDataset.length <= 0) {
      this.pDataset.push(e.target.innerHTML)
      this.UniqSet.push(e.target.innerHTML)
    } else {
      for (let i = 0; i <= this.pDataset.length; i++) {
        if (e.target.innerText == this.pDataset[i]) {
          console.log("First Break")
          break;
        } else {
          for (let j = 0; j < this.UniqSet.length; j++) {
            if (this.pDataset[i] == this.UniqSet[j]) {
              console.log("Second Break")
              break;
            } else {
              this.pDataset.push(e.target.innerHTML)
              this.UniqSet.push(e.target.innerHTML)
              console.log("Adding more")
            }
            break;
          }
        }
      }
    }

  }

  onClickRemove(i: number) {
    this.pDataset.splice(i, 1);
  }

}

