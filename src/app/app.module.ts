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
import { DialogWindowOverViewComponentComponent } from './dialog-window-over-view-component/dialog-window-over-view-component.component';
import {DialogWindowComponent} from "./dialog-window/dialog-window.component";
import { FooterComponent } from './footer/footer.component';
import { PriceGraphComponent } from './graph/price-graph/price-graph.component';
import {TimeFiltersComponent} from './time-filters/time-filters.component'
import { CostComponent } from './quanData/cost/cost.component';
import { QuanDataComponent } from './quanData/quan-data/quan-data.component';
import { UnbookedComponent } from './quanData/unbooked/unbooked.component';
import { BookedComponent } from './quanData/booked/booked.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FilterBarComponent} from "./filter-bar/filter-bar.component";
import {TimeFiltersComponent} from "./time-filters/time-filters.component";
import {FilterBarModule} from "./filter-bar/filter-bar.module";
import { AppRoutingModule } from './app-routing.module';
import { AkademiComponent } from './Academy/akademi.component';
import { HusComponent } from './hus/hus.component';
import { LevelComponent } from './level/level.component';
import { RoomComponent } from './room/room.component';
import { TestingComponent } from './testing/testing.component';

import {RouterModule} from "@angular/router";
import { CalculationsComponent } from './service/calculations/calculations.component';

@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    AppComponent,
    HeaderComponent,
    DialogWindowComponent,
    DialogWindowOverViewComponentComponent,
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
    TestingComponent,
    TimeFiltersComponent,

    PriceGraphComponent,
      CalculationsComponent,
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
    HttpClientModule,
    MatBottomSheetModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      {path : 'footer', component : FooterComponent},
      {path : 'header' , component : HeaderComponent},
      {path : 'mini-header' , component : MiniHeaderComponent},
      {path : 'quanData-head' , component : BookedComponent},
      {path :  'quanData-cost' , component : CostComponent},
      {path : 'quan-data' , component : QuanDataComponent},
      {path : 'quan-unbooked' , component : UnbookedComponent}
    ])
  ],
  entryComponents: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
