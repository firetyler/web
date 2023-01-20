import {Component} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {GetScheduleDataService} from "../service/get-schedule-data.service";

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'primary'},
  }]

})
export class TimeFiltersComponent {
  numbers: Array<number> = [];
  lists: Array<number>[] = [];
  startDate: Date | undefined;
  numberOfDays: number = 0;
  loader: boolean = true;
  list: any[] = ["7 dagar", "30 dagar"];
  isHidden: boolean = true;

  constructor(private dataService: GetScheduleDataService) {}

  onUpdate(dateObject: any) {
    this.startDate = dateObject.value;
  }

 async onSelect(event: any) {
    let numberOfDays = event.split(' ');
    this.numberOfDays = parseInt(numberOfDays[0],10);
    if (this.startDate != undefined && this.numberOfDays != 0) {
      this.isHidden = false;
    await this.dataService.setDates(this.startDate, this.numberOfDays);
     await this.loading();
    } else {
      alert("Vänligen välj ett datum och välj sedan antalet dagar igen!")
    }
  }

  getNumberOfDays() {
    return this.numberOfDays;
  }
 async loading (){
    setTimeout (() => {
      this.loader = false;
    },3000);
    console.log("loding is finito")
  }

  getNumberOfWorkDays() {
    if (this.startDate != undefined) {
      let startDay = this.startDate.getDay();
      if ((startDay == 5 || startDay == 0) && this.numberOfDays == 30) {
        return this.numberOfDays - 9;
      } else if (startDay == 6 && this.numberOfDays == 30) {
        return this.numberOfDays - 10;
      } else if (this.numberOfDays == 30 && (startDay < 5 && startDay > 0)) {
        return this.numberOfDays - 8;
      } else {
        return this.numberOfDays - 2;
      }
    } else {
      return 0;
    }
  }
}
