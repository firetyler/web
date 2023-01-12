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
import { TestingComponent } from './testing/testing.component';

import { PriceGraphComponent } from './graph/price-graph/price-graph.component';
import { BehaviorGraphComponent } from './graph/behavior-graph/behavior-graph.component';
import {Behavior2Service} from "./service/behavior2.service";
import {RouterModule} from "@angular/router";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    HeaderComponent,
    DialogWindowComponent,
    DialogWindowOverViewComponentComponent,
    FooterComponent,
    PriceGraphComponent,
    CostComponent,
    QuanDataComponent,
    UnbookedComponent,
    BookedComponent,
    BehaviorGraphComponent,
    TestingComponent,
    TimeFiltersComponent,

    PriceGraphComponent,

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
    MatBottomSheetModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      {path: 'footer', component: FooterComponent},
      {path: 'header', component: HeaderComponent},
      {path: 'mini-header', component: MiniHeaderComponent},
      {path: 'quanData-head', component: BookedComponent},
      {path: 'quanData-cost', component: CostComponent},
      {path: 'quan-data', component: QuanDataComponent},
      {path: 'quan-unbooked', component: UnbookedComponent}
    ]),
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ],
  entryComponents: [
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
