import {Component, Injectable, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuanDataCalcService} from "../../service/quan-data-calc.service";
import {TimeFiltersComponent} from "../../time-filters/time-filters.component";
import {QuanDataUpdateService} from "../quan-data/quan-data-update.service";

@Component({
  selector: 'app-booked',
  templateUrl: './booked.component.html',
  styleUrls: ['./booked.component.css'],
  providers : [QuanDataCalcService]
})

@Injectable({
  providedIn: 'root'
})
export class BookedComponent implements OnInit {
  procNumber: number = 0;
  totalBookedHours: number = 0;
  totalHours: number = 0;
  isWorkDay: boolean = false;
  dateFilter: number = 0;
  constructor(private calc: QuanDataCalcService, private filterService: QuanDataUpdateService) {}

  ngOnInit(): void {
    this.filterService.currentWorkDaysFilter.subscribe(isWorkDay => {
      this.isWorkDay = isWorkDay;
      this.updateNumbers();
    });
    this.filterService.currentDateFilter.subscribe(dateFilter => {
      this.dateFilter = dateFilter;
      this.updateNumbers();
    });
  }

  updateNumbers() {
    if(!this.isWorkDay) {
      this.procNumber = this.getProcNumber(this.dateFilter);
      this.totalBookedHours = Math.round(this.calc.getBookedHours());
      this.totalHours = Math.round(this.calc.getTotalHour(this.dateFilter));
    } else {
      this.procNumber = this.getProcWorkNumber(this.dateFilter);
      this.totalBookedHours = Math.round(this.calc.getBookedWorkHours());
      this.totalHours = this.calc.getTotalWorkHours(this.filterService.startDate,this.dateFilter);
    }
  }

  getProcNumber(dateFilter: number) {
    return Math.round(this.calc.getBookedHoursPercentage(dateFilter));
  }

  getProcWorkNumber(dateFilter: number) {
    return Math.round(this.calc.getBookedWorkHoursPercentage(this.filterService.startDate,dateFilter));
  }




}
