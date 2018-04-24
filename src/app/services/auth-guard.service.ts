// import { AuthService } from './auth.service';
// import { Injectable } from '@angular/core';
// import { CanActivate, RouterStateSnapshot, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

// @Injectable()
// export class AuthGuardService implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) { }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     let url: string = state.url;
//     return this.checkLogin(url);
//     console.log(`AuthGuard#canActivate called`);
//     return true;
//   }

//   checkLogin(url: string): boolean {
//     if (this.authService.currentUser) {
//       return true;
//     }
//   }

// }
