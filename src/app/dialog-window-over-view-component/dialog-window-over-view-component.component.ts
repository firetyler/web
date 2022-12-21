import {Component, inject, OnInit} from '@angular/core';
import {MatBottomSheet,MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-dialog-window-over-view-component',
  templateUrl: './dialog-window-over-view-component.component.html',
  styleUrls: ['./dialog-window-over-view-component.component.css']
})
export class DialogWindowOverViewComponentComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<DialogWindowOverViewComponentComponent>) {}

  selectAction(event : MouseEvent) : void{
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
