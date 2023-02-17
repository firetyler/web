import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{



   constructor(private router: Router) {
   }
  username: string = "";
  password: string = "";

  onSubmit(){
     console.log(this.username)
    console.log(this.password)

     if(this.username == "admin" && this.password == "20hig23"){
       this.router.navigate(['./main']);

     }else{
      alert("funkar ej")
     }

   }

  ngOnInit() {
  }


}
