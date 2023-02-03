import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AkademiComponent} from "./academy/akademi.component";
import {HouseComponent} from "./house/house.component";
import {LevelComponent} from "./level/level.component";
import {RoomComponent} from "./room/room.component";
import {DocumentationsComponent} from "./footer/documentations/documentations.component";

const routes: Routes = [
  { path: 'academy', component: AkademiComponent },
  { path: 'house', component: HouseComponent },
  { path: 'level', component: LevelComponent },
  { path: 'room', component: RoomComponent },
  { path: 'documentations', component: DocumentationsComponent },
  { path: '', redirectTo: '/academy', pathMatch: 'full' },
  { path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
