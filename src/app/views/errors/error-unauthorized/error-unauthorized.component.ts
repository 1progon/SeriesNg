import {Component} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-error-unauthorized',
    templateUrl: './error-unauthorized.component.html',
    styleUrls: ['./error-unauthorized.component.scss'],
    standalone: true,
    imports: [ContainerComponent]
})
export class ErrorUnauthorizedComponent {


  constructor(private authService: AuthService, private router: Router) {
    if (!authService.user) {
      this.router.navigateByUrl('/login').finally();
    }
  }
}
