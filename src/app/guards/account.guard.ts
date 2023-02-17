import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {UserType} from "../enums/users/UserType";

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.authService.user;

    if (!user) {
      this.router.navigateByUrl('/login').finally();
      return false;
    }

    if (user && (user.type == UserType.User || user.type == UserType.Admin)) {
      return true;
    }


    this.router.navigateByUrl('/' + AuthService.UNAUTHORIZED_ROUTE).finally();
    return false;
  }

}
