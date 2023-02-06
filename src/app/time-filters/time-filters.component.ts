import {Component, Injectable} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {GetScheduleDataService} from "../service/get-schedule-data.service";
import {MiniHeaderComponent} from "../mini-header/mini-header.component";
import {QuanDataUpdateService} from "../quanData/quan-data/quan-data-update.service";

@Component({
  selector: 'app-time-filters',
  templateUrl: './time-filters.component.html',
  styleUrls: ['./time-filters.component.css'],
  providers: [{
    provide: {MAT_RADIO_DEFAULT_OPTIONS, MiniHeaderComponent},
    useValue: {color: 'warn'},
  }]
})
@Injectable({
  providedIn: 'root'
})
export class TimeFiltersComponent {
  numbers: Array<number> = [];
  startDate: Date | undefined;
  numberOfDays: number = 0;
  loader: boolean = true;
  list: any[] = ["7 dagar", "30 dagar"];
  calcOptions: string[] = ["08-17, Mån-Fre", "05-24, Mån-Sön"];
  isHidden: boolean = true;
  private isWorkDays: boolean;

  constructor(private dataService: GetScheduleDataService, private filterService: QuanDataUpdateService) {
    this.isWorkDays = false;
  }

  onUpdate(dateObject: any) {
    this.startDate = dateObject.value;
    this.filterService.setDate(this.startDate);
  }

  changeDateFilter(dateFilter: number) {
    this.filterService.changeDate(dateFilter);
  }
  changeWorkDayFilter() {
    this.filterService.changeIsWorkDay(this.isWorkDays);
    this.filterService.changeIsWorkDayFilter(this.isWorkDays);
  }

  async onSelect(event: any) {
    let numberOfDays = event.split(' ');
    this.numberOfDays = parseInt(numberOfDays[0], 10);
    if (this.startDate != undefined && this.numberOfDays != 0) {
      this.loader = true;
      this.isHidden = false;
      await this.dataService.fillArrayByTimePeriod(this.startDate, this.numberOfDays);
      await this.loading();
    } else {
      alert("Vänligen välj ett datum och välj sedan antalet dagar igen!")
    }
    this.changeDateFilter(this.numberOfDays);
  }

  async loading() {
    setTimeout(() => {
      this.loader = false;
    }, 3000);
  }

  onCalcSelect(time: string) {
    if (time === '08-17, Mån-Fre') {
      this.isWorkDays = true;
    } else if (time === "05-24, Mån-Sön") {
      this.isWorkDays = false;
    }
    this.changeWorkDayFilter()
  }
}
