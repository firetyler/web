import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
})
export class DialogWindowComponent {
  constructor(private bottomSheet: MatBottomSheet) {
  }
  openBottomSheet(): void {
    this.bottomSheet.open(DialogWindowOverViewComponent);
  }
}
@Component({
  selector: 'app-dialog-window-over-view',
  templateUrl: './dialog-window-over-view.component.html',
  styleUrls : ['./dialog-window-over-view.component.css']
})
export class DialogWindowOverViewComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<DialogWindowOverViewComponent>) {

  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
