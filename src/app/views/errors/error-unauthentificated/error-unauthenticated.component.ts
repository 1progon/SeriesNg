import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-unauthenticated',
  templateUrl: './error-unauthenticated.component.html',
  styleUrls: ['./error-unauthenticated.component.scss']
})
export class ErrorUnauthenticatedComponent {


  constructor(private authService: AuthService, private router: Router) {
    if (!authService.user) {
      this.router.navigateByUrl('/login').finally();
    }
  }
}
