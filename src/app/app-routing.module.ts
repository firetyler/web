import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AkademiComponent} from "./academy/akademi.component";
import {HouseComponent} from "./house/house.component";
import {LevelComponent} from "./level/level.component";
import {RoomComponent} from "./room/room.component";

const routes: Routes = [
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
