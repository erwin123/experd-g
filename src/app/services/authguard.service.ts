import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';


@Injectable()
export class AuthguardService implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
      
      return true;
    } 
    
    // not logged in so redirect to login page with the return url
    this.router.navigate(['main/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}