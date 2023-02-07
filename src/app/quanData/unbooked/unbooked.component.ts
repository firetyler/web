import {Component, OnInit} from '@angular/core';
import {QuanDataCalcService} from "../../service/quan-data-calc.service";
import {QuanDataUpdateService} from "../quan-data/quan-data-update.service";

@Component({
  selector: 'app-unbooked',
  templateUrl: './unbooked.component.html',
  styleUrls: ['./unbooked.component.css']
})
export class UnbookedComponent implements OnInit{
  procNumber: number = 0;
  totalUnbookedHours: number = 0;
  totalHours: number = 0;
  isWorkDay: boolean = false;
  dateFilter: number = 0;

  constructor(private calc: QuanDataCalcService, private filterService: QuanDataUpdateService) {}

  ngOnInit() {
    this.filterService.currentWorkDaysFilter.subscribe(isWorkDay => {
      this.isWorkDay = isWorkDay;
      this.updateNumbers();
    })
    this.filterService.currentDateFilter.subscribe(dateFilter => {
      this.dateFilter = dateFilter;
      this.updateNumbers();
    });
  }

  updateNumbers() {
    if(!this.isWorkDay) {
      this.procNumber = this.getProcNumber(this.dateFilter);
      this.totalUnbookedHours = Math.round(this.calc.getTotalHour(this.dateFilter)-this.calc.getBookedHours());
      this.totalHours = Math.round(this.calc.getTotalHour(this.dateFilter));
    } else {
      this.procNumber = this.getProcWorkNumber(this.dateFilter);
      this.totalUnbookedHours = Math.round(this.calc.getTotalWorkHours(this.filterService.startDate,this.dateFilter)-this.calc.getBookedWorkHours());
      this.totalHours = this.calc.getTotalWorkHours(this.filterService.startDate,this.dateFilter);
    }
  }

  getProcNumber(dateFilter: number) {
    if (this.calc.getBookedHoursPercentage(dateFilter) == 0) {
      return 0;
    }
    return Math.round(100-this.calc.getBookedHoursPercentage(dateFilter))
  }

  getProcWorkNumber(dateFilter: number) {
    if(this.calc.getBookedWorkHoursPercentage(this.filterService.startDate,dateFilter) == 0) {
      return 0;
    }
    return Math.round(100-this.calc.getBookedWorkHoursPercentage(this.filterService.startDate,dateFilter))
  }
}
