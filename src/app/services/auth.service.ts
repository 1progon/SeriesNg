import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginFormDto} from "../dto/auth/LoginFormDto";
import {RegisterFormDto} from "../dto/auth/RegisterFormDto";
import {UserDto} from "../dto/users/UserDto";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get user(): UserDto | undefined {
    return this._user;
  }

  constructor(private http: HttpClient) {
  }

  private _user?: UserDto;


  register(formDto: RegisterFormDto) {
    return this.http.post<UserDto>(environment.apiUrl + 'login', formDto)
      .pipe(map(value => {
        this._user = value;
        return value;
      }));
  }

  login(formDto: LoginFormDto) {
    return this.http.post<UserDto>(environment.apiUrl + 'register', formDto)
      .pipe(map(value => {
        this._user = value;
        return value;
      }));
  }
}
