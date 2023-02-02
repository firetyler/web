import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { FilterPipe } from './component/search-bar/filter.pipe';
import {FormsModule} from "@angular/forms";
import { MiniHeaderComponent } from '../mini-header/mini-header.component';



@NgModule({
  declarations: [
    SearchBarComponent,
    FilterPipe,
  ],
  exports: [
    SearchBarComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
    ]
})
export class FilterBarModule { }
