import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FilterBarComponent} from "./filter-bar/filter-bar.component";
import {TimeFiltersComponent} from "./time-filters/time-filters.component";
import {AkademiComponent} from "./akademi/akademi.component";
import {HusComponent} from "./hus/hus.component";
import {LevelComponent} from "./level/level.component";
import {RoomComponent} from "./room/room.component";

const routes: Routes = [
  {
    path: 'Akademi', component: AkademiComponent, children: [
      { path: '', component: FilterBarComponent },
      { path: '', component: TimeFiltersComponent }
    ]
  }
  ,
  { path: 'Hus', component: HusComponent, children: [
      { path: '', component: FilterBarComponent },
      { path: '', component: TimeFiltersComponent }
    ] }
  ,
  { path: 'Level', component: LevelComponent, children: [
      { path: '', component: FilterBarComponent },
      { path: '', component: TimeFiltersComponent }
    ] }
  ,
  { path: 'Room', component: RoomComponent, children: [
      { path: '', component: FilterBarComponent },
      { path: '', component: TimeFiltersComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
