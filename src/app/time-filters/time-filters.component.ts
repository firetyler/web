import {Component, Injectable} from '@angular/core';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {GetScheduleDataService} from "../service/get-schedule-data.service";
import {MiniHeaderComponent} from "../mini-header/mini-header.component";
import {Subject} from "rxjs";
import {BookedComponent} from "../quanData/booked/booked.component";
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
    this.isWorkDays = true;

  }

  onUpdate(dateObject: any) {
    this.startDate = dateObject.value;
  }

  changeDateFilter(dateFilter: number) {
    this.filterService.changeDateFilter(dateFilter);
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

  getNumberOfDays() {
    return this.numberOfDays;
  }

  async refresh() {
    window.location.reload();
  }

  async loading() {
    setTimeout(() => {
      this.loader = false;
    }, 3000);
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

  onCalcSelect(time: string) {
    if (time === 'Arbetstider') {
      this.isWorkDays = true;
    } else if (time === "Hela dygn") {
      this.isWorkDays = false;
    }
  }
}
