import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {
  DialogWindowOverViewComponentComponent
} from "../dialog-window-over-view-component/dialog-window-over-view-component.component";


@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent{
  constructor(private bottomSheet: MatBottomSheet) {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(DialogWindowOverViewComponentComponent);
  }

}
