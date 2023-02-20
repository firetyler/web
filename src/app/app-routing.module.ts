import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AuthGuardService} from "./service/auth-guard.service";

const routes: Routes = [
  {path:'', component: MainComponent, canActivate : [AuthGuardService]},
  {path:'login', component: LoginComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
