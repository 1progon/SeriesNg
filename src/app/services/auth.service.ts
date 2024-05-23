import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginFormDto} from "../dto/auth/LoginFormDto";
import {RegisterFormDto} from "../dto/auth/RegisterFormDto";
import {UserDto} from "../dto/users/UserDto";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user?: UserDto;

  public static UNAUTHORIZED_ROUTE = 'unauthorized';
  public static UNAUTHENTICATED_ROUTE = 'unauthenticated';

  controller: string = 'Auth';
  api: string = environment.apiUrl + this.controller;


  constructor(private http: HttpClient,
              private router: Router) {
  }

  set user(value: UserDto | undefined) {
    this._user = value;
  }

  get user(): UserDto | undefined {
    return this._user;
  }


  register(formDto: RegisterFormDto) {
    return this.http.post<UserDto>(this.api + '/register', formDto)
      .pipe(map(value => {
        this._user = value;
        return value;
      }));
  }

  login(formDto: LoginFormDto) {
    return this.http.post<UserDto>(this.api + '/login', formDto)
      .pipe(map(value => {
        this._user = value;
        return value;
      }));
  }

  logout() {
    this._user = undefined;
  }

  redirectNotAuthorized() {
    this.router.navigateByUrl('/' + AuthService.UNAUTHORIZED_ROUTE).finally();
  }

  redirectNotAuthenticated() {
    this.router.navigateByUrl('/' + AuthService.UNAUTHENTICATED_ROUTE).finally();
  }

  logoutWithRedirectToLoginPage() {
    this.logout();
    this.router.navigateByUrl('/login').finally();

  }
}
