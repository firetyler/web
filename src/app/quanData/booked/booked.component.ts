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
  constructor(private calc : QuanDataCalcService, private time : TimeFiltersComponent, private filterService: QuanDataUpdateService) {}

  ngOnInit(): void {
    this.filterService.currentDateFilter.subscribe(dateFilter => {
      this.procNumber = this.getProcNumber(dateFilter);
    });
  }

  getProcNumber(dateFilter: number) {

    return this.calc.getBookedHoursPercentage(dateFilter);
  }




}
