import {Injectable} from '@angular/core';
import {UpdateUserDto} from "../dto/users/UpdateUserDto";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode} from "@angular/common/http";
import {UserDto} from "../dto/users/UserDto";
import {environment} from "../../environments/environment";
import {catchError, map, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  updateUser(user: UpdateUserDto) {
    if (!this.authService.user) {
      return throwError(() => {
        return new HttpErrorResponse({
          status: HttpStatusCode.Unauthorized,
          error: {message: 'Нужно войти в аккаунт'},
        })
      });
    }

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.authService.user.token)


    return this.http.put<UserDto>(environment.apiUrl + 'users/update-user',
      user, {headers})
      .pipe(
        map(value => {
          this.authService.user = value;
          return value;
        }),
        catchError((err) => {

          if (err instanceof HttpErrorResponse) {

            switch (err.status) {
              case 401:
                this.authService.logoutWithRedirectToLoginPage();
                break;
              case 403:
                this.router.navigateByUrl('/' + AuthService.UNAUTHORIZED_ROUTE).finally();
                break;
            }
          }

          return throwError(() => {
            return err
          })
        })
      )
  }
}
