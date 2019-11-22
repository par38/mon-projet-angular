import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router'
import { AuthService } from './auth.service'
import { Injectable } from '@angular/core'
import {Router} from '@angular/router'
// import { Observable } from 'rxjs/Observable'  // génère une erreur
import { Observable } from 'rxjs'

@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/auth'])
    }
  }
}