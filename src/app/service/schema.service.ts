import {Injectable} from '@angular/core';
import axios from "axios";
import {XMLParser} from "fast-xml-parser";

@Injectable({
  providedIn: 'root'
})

export class SchemaService {
  private jObj: any;
  private scheduleEntryArray: ScheduleEntry[] = [];

  constructor() {
  }

  getSoapData(startDatum:String, slutDatum:String) {
    const startDatumTest = "2019-02-5";
    const slutDatumTest = "2019-02-5";
    const url = 'https://kronoxtest.hig.se:8443/appserver-ejb/RapportEJB';
    const sr = '<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" ' +
      'xmlns:tjan=\"http://www.kronox.se/webb/tjanster/\" ' +
      'xmlns:typ=\"http://www.kronox.se/webb/tjanster/typer\">' +
        '<soapenv:Header/>' +
          '<soapenv:Body>' +
            '<tjan:hamtaSchemaPosterOchForklaringsTexterForVillkorMedFastaDatum>' +
              '<arg0>' +
                '<typ:eventuelltKlientId>?</typ:eventuelltKlientId>' +
                '<typ:slutDatum>' + slutDatumTest + '</typ:slutDatum>' +
                '<typ:startDatum>' + startDatumTest + '</typ:startDatum>' +
                '<typ:villkor>' +
                  '<typ:aktivitetstyp></typ:aktivitetstyp>' +
                  '<typ:bokningstyp>?</typ:bokningstyp>' +
                  '<typ:extraAttribut></typ:extraAttribut>' +
                  '<typ:filterTyp>resurser</typ:filterTyp>' +
                  '<typ:filterVarden>l.99514</typ:filterVarden>' +
                  '<typ:moment>?</typ:moment>' +
                  '<typ:orgenheterRESURSER>?</typ:orgenheterRESURSER>' +
                  '<typ:orgenheterUTB>?</typ:orgenheterUTB>' +
                  '<typ:sokMedAND>?</typ:sokMedAND>' +
                  '<typ:sprak>?</typ:sprak>' +
                  '<typ:taMedForklaringar>?</typ:taMedForklaringar>' +
                '</typ:villkor>' +
              '</arg0>' +
            '</tjan:hamtaSchemaPosterOchForklaringsTexterForVillkorMedFastaDatum>' +
          '</soapenv:Body>' +
      '</soapenv:Envelope>';
    const axi = axios.create();
    axi.post(url, sr).then(data => {
      const parser = new XMLParser();
      this.jObj = parser.parse(data.data);
      this.jObj = this.jObj['soap:Envelope']
        ['soap:Body']
        ['ns3:hamtaSchemaPosterOchForklaringsTexterForVillkorMedFastaDatumResponse']
        ['return']
        ['ns2:schemaPoster'];
      for (let i = 0; i < this.jObj.length; i++) {
        this.scheduleEntryArray.push(new ScheduleEntry(this.jObj['ns2:resurser']['ns2:startDatumTid']))
      }
    });
  }
}

export class ScheduleEntry {
  //startTime:string;
  //endTime:string;
  //startDate:string;
  //endDate:string;
  room:string;
  course:string;
  constructor(/*startTime:string, endTime:string, startDate:string, endDate:string,*/ room:string, course:string) {
    //this.startTime = startTime;
    //this.endTime = endTime;
    //this.startDate = startDate;
    //this.endDate = endDate;
    this.room = room;
    this.course = course;
  }
}
