import {Injectable} from '@angular/core';
import {UpdateUserDto} from "../dto/users/UpdateUserDto";
import {HttpClient} from "@angular/common/http";
import {UserDto} from "../dto/users/UserDto";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  updateUser(user: UpdateUserDto) {
    return this.http.put<UserDto>(environment.apiUrl + 'users/update-user',
      user)
      .pipe(map(value => {
        this.authService.user = value;
        return value;
      }))
  }
}
