import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string = "";
  password: string = "";

   constructor(private router: Router, private authservice : AuthService) {
   }


  onSubmit(){
     if(this.authservice.logIn(this.username, this.password)){
       this.router.navigate(['']);
     }else{
       alert("Användarnamn eller lösenord är felaktig!")
     }
   }

  ngOnInit() {
  }


}
