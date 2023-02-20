import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private isLoggedIn : boolean = false;
  constructor() { }

  logIn(username : string, password : string) : boolean{
    if(username === "admin" && password === "20hig23") {
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('password', password);
      return this.isLoggedIn = true;
    }else return this.isLoggedIn = false;
  }
  logout() : void{
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    this.isLoggedIn = false;
    window.location.reload();
  }
  isLogIn() : boolean{
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    return !!username && !!password;
  }
}
