import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FoterComponent } from './component/foter/foter.component';
import { BodyComponent } from './component/body/body.component';
import { HeaderComponent } from './component/header/header.component';
import { BottombarComponent } from './bottombar/bottombar.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    HeaderComponent,
    FoterComponent,

    BottombarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
