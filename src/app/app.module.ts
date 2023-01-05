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
import { CostComponent } from './quanData/cost/cost.component';
import { QuanDataComponent } from './quanData/quan-data/quan-data.component';
import { UnbookedComponent } from './quanData/unbooked/unbooked.component';
import { BookedComponent } from './quanData/booked/booked.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FilterBarComponent} from "./filter-bar/filter-bar.component";
import {TimeFiltersComponent} from "./time-filters/time-filters.component";
import {FilterBarModule} from "./filter-bar/filter-bar.module";
import { AppRoutingModule } from './app-routing.module';
import { AkademiComponent } from './akademi/akademi.component';
import { HusComponent } from './hus/hus.component';
import { LevelComponent } from './level/level.component';
import { RoomComponent } from './room/room.component';


@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CostComponent,
    QuanDataComponent,
    UnbookedComponent,
    BookedComponent,
    FilterBarComponent,
    TimeFiltersComponent,
    AkademiComponent,
    HusComponent,
    LevelComponent,
    RoomComponent,
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
    HttpClientModule,
    FilterBarModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
