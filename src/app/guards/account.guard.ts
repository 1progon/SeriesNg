import {CanActivateFn, Router} from '@angular/router';
import {UserType} from "../enums/users/UserType";
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const accountGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  let user = authService.user;

  if (!user) {
    router.navigateByUrl('/login').finally();
    return false;
  }

  if (user && (user.type == UserType.User || user.type == UserType.Admin)) {
    return true;
  }


  router.navigateByUrl('/' + AuthService.UNAUTHORIZED_ROUTE).finally();
  return false;
}
