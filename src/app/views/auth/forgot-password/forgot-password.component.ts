import {Component} from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  // todo implement class and password recovery

  email?: string;
  loading: boolean = false;
  errors?: HttpErrorResponse;
  friendlyError?: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.authService.user) {
      this.router.navigateByUrl('/account').finally();
      return;
    }

    document.body.scrollIntoView();
  }

  submit() {
    console.log(this.email);
  }
}
