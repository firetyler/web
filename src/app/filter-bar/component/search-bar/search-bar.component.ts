import { Component } from '@angular/core';
import * as Http from "http";


//https://mdbootstrap.com/docs/b4/angular/forms/search/
//https://stackoverflow.com/questions/53756451/angular-7-error-rangeerror-maximum-call-stack-size-exceeded
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchText: any;
  dataset = ['MDB', 'Angular', 'Bootstrap', 'Framework', 'SPA', 'React', 'Vue'];


   // Fake API URL
   url: string = 'https://jsonplaceholder.typicode.com/users';
   usersArray: Array<any> = [];


/*
   // @ts-ignore
   constructor(private http: Http) {
     this.http.get(this.url).subscribe((data: { json: () => any[]; }) => {
       // Populating usersArray with names from API
       data.json().forEach(element => {
         this.usersArray.push(element.name);
       });
     });
   }
*/


}
