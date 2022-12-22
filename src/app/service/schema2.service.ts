import { Injectable } from '@angular/core';
import axios, {Axios} from "axios";
import {data} from "cheerio/lib/api/attributes";

@Injectable({
  providedIn: 'root'
})
export class Schema2Service {

  constructor() { }

  getSoapData() {
    const url = 'https://kronoxtest.hig.se:8443/appserver-ejb/RapportEJB';
    const sr = '<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:tjan=\"http://www.kronox.se/webb/tjanster/\" xmlns:typ=\"http://www.kronox.se/webb/tjanster/typer\"> ' +
      '<soapenv:Header/><soapenv:Body> ' +
      '<tjan:hamtaSchemaPosterOchForklaringsTexterForVillkorMedIntervall> ' +
      '<arg0> ' +
      '<typ:eventuelltKlientId>?</typ:eventuelltKlientId> ' +
      '<typ:intervallAntal>5</typ:intervallAntal>' +
      '<typ:intervallTyp>d</typ:intervallTyp>' +
      '<typ:startDatum>2021-12-02</typ:startDatum>' +
      '<typ:villkor>' +
      '<typ:aktivitetstyp>?</typ:aktivitetstyp>' +
      '<typ:bokningstyp>?</typ:bokningstyp>' +
      '<typ:extraAttribut></typ:extraAttribut>' +
      '<typ:filterTyp>resurser</typ:filterTyp>' +
      '<typ:filterVarden>l.99518</typ:filterVarden>' +
      '<typ:moment>?</typ:moment>' +
      '<typ:orgenheterRESURSER>?</typ:orgenheterRESURSER>' +
      '<typ:orgenheterUTB>?</typ:orgenheterUTB>' +
      '<typ:sokMedAND>?</typ:sokMedAND>' +
      '<typ:sprak>?</typ:sprak>' +
      '<typ:taMedForklaringar></typ:taMedForklaringar>' +
      '</typ:villkor>' +
      '</arg0>' +
      '</tjan:hamtaSchemaPosterOchForklaringsTexterForVillkorMedIntervall>' +
      '</soapenv:Body></soapenv:Envelope>';
    const axi = axios.create();
    axi.post(url,sr).then(data => {
      const svar = data.data
      console.log(svar)
    });
  }

}
