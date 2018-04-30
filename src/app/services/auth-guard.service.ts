import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { SERVER_URL } from './../../assets/server-url';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.auth.currentUser) {
      return true;
    }
    this.auth.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

}
