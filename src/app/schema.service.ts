import { Injectable } from '@angular/core';
//import { HttpClient } from "@angular/common/http";
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class SchemaService {
  //private URL: string = "https://kronoxtest.hig.se/appserver-ejb/RapportEJB?wsdl";
  constructor() { }

  getSoapData() {
    const svar= axios.get("https://kronoxtest.hig.se/appserver-ejb/RapportEJB?wsdl")
      .then(function (response) {
        console.log(response);
      });
    return svar;
  }
}
