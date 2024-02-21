import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private UserService: UserService, private router: Router) {}

  canActivate(): boolean{
    if(this.UserService.loggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false; 
  }
}
