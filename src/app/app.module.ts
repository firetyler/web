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
import { TimeFiltersComponent } from './time-filters/time-filters.component';
import {ɵEmptyOutletComponent} from "@angular/router";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    AppComponent,
    HeaderComponent,
    TimeFiltersComponent,
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
        MatButtonModule,
        ɵEmptyOutletComponent,
        DragDropModule,
        MatDatepickerModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
