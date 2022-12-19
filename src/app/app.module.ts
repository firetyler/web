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
import { FooterComponent } from './footer/footer.component';
import {TimeFiltersComponent} from './time-filters/time-filters.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component'
import {FilterBarModule} from "./filter-bar/filter-bar.module";

@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimeFiltersComponent,
    FilterBarComponent,

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
    FilterBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
