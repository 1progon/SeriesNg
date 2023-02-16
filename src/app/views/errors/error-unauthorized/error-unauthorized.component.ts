import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent {


  constructor(private authService: AuthService, private router: Router) {
    if (!authService.user) {
      this.router.navigateByUrl('/login').finally();
    }
  }
}
