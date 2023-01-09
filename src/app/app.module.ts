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
import {TimeFiltersComponent} from './time-filters/time-filters.component';
import {NgxPrintModule} from "ngx-print";

@NgModule({
  declarations: [
    AppComponent,
    MiniHeaderComponent,
    HeaderComponent,
    DialogWindowComponent,
    DialogWindowOverViewComponentComponent,
    FooterComponent,
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
    MatBottomSheetModule,
    MatNativeDateModule,
    NgxPrintModule

  ],
  entryComponents: [
 HeaderComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
