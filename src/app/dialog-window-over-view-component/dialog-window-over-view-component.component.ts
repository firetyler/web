import {Component, inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-dialog-window-over-view-component',
  templateUrl: './dialog-window-over-view-component.component.html',
  styleUrls: ['./dialog-window-over-view-component.component.css']
})
export class DialogWindowOverViewComponentComponent{
  constructor(private _bottomSheetRef: MatBottomSheetRef<DialogWindowOverViewComponentComponent>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
