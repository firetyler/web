import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatTableModule} from "@angular/material/table";
import {MatListModule} from "@angular/material/list";
import { MiniHeaderComponent } from './mini-header/mini-header.component';

import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "./header/header.component";
import { DialogWindowOverViewComponentComponent } from './dialog-window-over-view-component/dialog-window-over-view-component.component';
import {DialogWindowComponent} from "./dialog-window/dialog-window.component";
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS} from "@angular/material/bottom-sheet";

@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    AppComponent,
    HeaderComponent,
    DialogWindowComponent,
    DialogWindowOverViewComponentComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MatListModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonModule
  ],
  entryComponents: [
 HeaderComponent,DialogWindowOverViewComponentComponent

  ],
  providers: [
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
