import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserType} from "../../../enums/users/UserType";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: true
})
export class DashboardComponent implements OnInit {

  userTypes: typeof UserType = UserType;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  userLoggedType() {
    return UserType[this.authService.user?.type ?? 0];
  }


}
