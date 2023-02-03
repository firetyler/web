import {Injectable} from '@angular/core';
import axios from "axios";
import {XMLParser} from "fast-xml-parser";

@Injectable({
  providedIn: 'root'
})

export class SchemaService {
  private jObj: any;
  private scheduleEntryArray: ScheduleEntry[] = [];

  async getSoapData(inputDate: Date): Promise<ScheduleEntry[]> {
    this.scheduleEntryArray = [];
    let svar = "";
    let date = inputDate.getFullYear() + "-" + (inputDate.getMonth()+1) + "-" + inputDate.getDate();
    const url = 'https://kronoxtest.hig.se:8443/appserver-ejb/RapportEJB';
    const sr = '<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" ' +
      'xmlns:tjan=\"http://www.kronox.se/webb/tjanster/\" ' +
      'xmlns:typ=\"http://www.kronox.se/webb/tjanster/typer\">' +
      '<soapenv:Header/>' +
      '<soapenv:Body>' +
      '<tjan:hamtaSchemaPosterOchForklaringsTexterForVillkorMedFastaDatum>' +
      '<arg0>' +
      '<typ:eventuelltKlientId>?</typ:eventuelltKlientId>' +
      '<typ:slutDatum>' + date + '</typ:slutDatum>' +
      '<typ:startDatum>' + date + '</typ:startDatum>' +
      '<typ:villkor>' +
      '<typ:aktivitetstyp>Lektion</typ:aktivitetstyp>' +
      '<typ:bokningstyp>?</typ:bokningstyp>' +
      '<typ:extraAttribut></typ:extraAttribut>' +
      '<typ:filterTyp>resurser</typ:filterTyp>' +
      '<typ:filterVarden></typ:filterVarden>' +
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
      await axi.post(url,sr).then(async (data) => {
          svar = await data.data;

      }).catch((error) => {
        console.log(error);
      });
    const parser = new XMLParser();
    this.jObj = parser.parse(svar);
    this.jObj = this.jObj['soap:Envelope']
      ['soap:Body']
      ['ns3:hamtaSchemaPosterOchForklaringsTexterForVillkorMedFastaDatumResponse']
      ['return']
      ['ns2:schemaPoster'];
    //console.log(this.jObj);

    for (let i = 0; i < this.jObj?.length; i++) {
      let resurser: string[] = this.readResurser(this.jObj[i]['ns2:resurser']);
      if (resurser.length > 2) {
        for (let j = 1; j < resurser?.length; j++) {
          let courseId = resurser[0];
          if (!isNaN(+resurser[j]) && resurser[j] !== '0' ) {
            this.scheduleEntryArray.push(new ScheduleEntry(this.jObj[i]['ns2:startDatumTid']['ns2:varde'],
              this.jObj[i]['ns2:slutDatumTid']['ns2:varde'],
              resurser[j],
              courseId));
          }
        }
      } else if(!isNaN(+resurser[1])) {
        //console.log("Hej från fucking if-sats")
        this.scheduleEntryArray.push(new ScheduleEntry(this.jObj[i]['ns2:startDatumTid']['ns2:varde'],
          this.jObj[i]['ns2:slutDatumTid']['ns2:varde'],
          resurser[1],
          resurser[0]));
      }
      //console.log(resurser[1])
    }
 //console.log(this.scheduleEntryArray);
    return this.scheduleEntryArray;
  }

  readResurser(resurser: any) {
    let resursIndex = [];
    for (let i = 0; i < resurser?.length; i++) {
      if (resurser[i]['ns2:resursTyp'] === ("UTB_KURSINSTANS_GRUPPER")) {
        resursIndex.push(resurser[i]['ns2:resursId']);
      }
      if (resurser[i]['ns2:resursTyp'] === ('RESURSER_LOKALER')) {
        resursIndex.push(resurser[i]['ns2:resursId']);
      }
    }
    if (resursIndex.length < 2) {
      resursIndex.push(0);
    }
    return resursIndex;
  }
}

export class ScheduleEntry {
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  room: number;
  course: string;

  constructor(startDateTime: string, endDateTime: string, room: string, course: string) {

    this.room = parseInt(room);
    this.course = course;

    let dateAndTime = startDateTime.split(' ');
    this.startDate = dateAndTime[0];
    this.startTime = dateAndTime[1];

    dateAndTime = endDateTime.split(' ');
    this.endDate = dateAndTime[0];
    this.endTime = dateAndTime[1];
  }

  getTotalHours(): number {
    const startTimeArray = this.startTime.split(':');
    const endTimeArray = this.endTime.split(':');
    let startMinutes = 60 * parseInt(startTimeArray[0]) + parseInt(startTimeArray[1]);
    let endMinutes = 60 * parseInt(endTimeArray[0]) + parseInt(endTimeArray[1]);
    return (endMinutes - startMinutes)/60;
  }

}
