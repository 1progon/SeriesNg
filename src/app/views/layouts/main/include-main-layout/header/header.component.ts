import {Component} from '@angular/core';
import {AuthService} from "../../../../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import {UserType} from "../../../../../enums/users/UserType";
import { NgIf } from '@angular/common';
import { ContainerComponent } from '../../../../../components/container/container.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RouterLink, NgIf]
})
export class HeaderComponent {


  constructor(private authService: AuthService,
              private router: Router) {
  }

  isLogged() {
    return !!this.authService.user;
  }

  isLoggedAccountTypeUser() {
    return this.isLogged() && this.authService.user?.type == UserType.User;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/').finally();
    return;
  }

}
