import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatNativeDateModule} from '@angular/material/core';
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
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { PriceGraphComponent } from './graph/price-graph/price-graph.component';
import {TimeFiltersComponent} from './time-filters/time-filters.component'
import { CostComponent } from './quanData/cost/cost.component';
import { QuanDataComponent } from './quanData/quan-data/quan-data.component';
import { UnbookedComponent } from './quanData/unbooked/unbooked.component';
import { BookedComponent } from './quanData/booked/booked.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FilterBarComponent} from "./filter-bar/filter-bar.component";
import {FilterBarModule} from "./filter-bar/filter-bar.module";
import { AppRoutingModule } from './app-routing.module';
import { AkademiComponent } from './academy/akademi.component';
import { HouseComponent } from './house/house.component';
import { LevelComponent } from './level/level.component';
import { RoomComponent } from './room/room.component';
import { TestingComponent } from './testing/testing.component';
import { BehaviorGraphComponent } from './graph/behavior-graph/behavior-graph.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import { StartComponent } from './start/start.component';
import { GraphSortingComponent } from './graph/graph-sorting/graph-sorting.component';
import {NgxPrintModule} from "ngx-print";
import { SearchBarComponent } from './filter-bar/component/search-bar/search-bar.component';
import { UnbookedRoomsComponent } from './graph/unbooked-rooms/unbooked-rooms.component';
import {FilterSwitchService} from "./service/filter-switch.service";

import { DocumentationsComponent } from './footer/documentations/documentations.component';
import { AboutComponent } from './footer/about/about.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    HeaderComponent,
    FooterComponent,
    TimeFiltersComponent,
    PriceGraphComponent,
    CostComponent,
    QuanDataComponent,
    UnbookedComponent,
    BookedComponent,
    FilterBarComponent,
    TimeFiltersComponent,
    AkademiComponent,
    HouseComponent,
    LevelComponent,
    RoomComponent,
    BehaviorGraphComponent,
    TestingComponent,
    TimeFiltersComponent,
    PriceGraphComponent,
    GraphSortingComponent,
    StartComponent,
    UnbookedRoomsComponent,
    DocumentationsComponent,
    AboutComponent,
    LoginComponent,
    MainComponent,
  ],
  exports: [
    SearchBarComponent,
    MiniHeaderComponent
  ]
  ,
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
    AppRoutingModule,
    MatBottomSheetModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    NgxPrintModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
