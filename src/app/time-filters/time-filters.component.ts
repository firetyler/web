import {Component} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {GetScheduleDataService} from "../service/get-schedule-data.service";

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'warn'},
  }]

})
export class TimeFiltersComponent {
  startDate: Date | undefined;
  numberOfDays: number = 0;
  loader: boolean = true;
  list: any[] = ["7 dagar", "30 dagar"];
  calcOptions: string[] = ["08-17, Mån-Fre", "05-24, Mån-Sön"];
  isHidden: boolean = true;
  private isWorkDays: boolean;

  constructor(private dataService: GetScheduleDataService) {
    this.isWorkDays = true;
  }

  onUpdate(dateObject: any) {
    this.startDate = dateObject.value;
  }

  async onSelect(event: any) {
    let numberOfDays = event.split(' ');
    this.numberOfDays = parseInt(numberOfDays[0], 10);
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

  async loading() {
    setTimeout(() => {
      this.loader = false;
    }, 3000);
    console.log("loding is finito")
  }

  onCalcSelect(time: string) {
    if (time === 'Arbetstider') {
      this.isWorkDays = true;
    } else if (time === "Hela dygn") {
      this.isWorkDays = false;
    }
  }
}
