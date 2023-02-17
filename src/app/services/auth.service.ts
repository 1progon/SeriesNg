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
  set user(value: UserDto | undefined) {
    this._user = value;
  }

  get user(): UserDto | undefined {
    return this._user;
  }

  public static UNAUTHORIZED_ROUTE = 'unauthorized';
  public static UNAUTHENTICATED_ROUTE = 'unauthenticated';


  constructor(private http: HttpClient, private router: Router) {
  }


  private _user?: UserDto;


  register(formDto: RegisterFormDto) {
    return this.http.post<UserDto>(environment.apiUrl + 'auth/register', formDto)
      .pipe(map(value => {
        this._user = value;
        return value;
      }));
  }

  login(formDto: LoginFormDto) {
    return this.http.post<UserDto>(environment.apiUrl + 'auth/login', formDto)
      .pipe(map(value => {
        this._user = value;
        return value;
      }));
  }

  logout() {
    this._user = undefined;
  }
}
