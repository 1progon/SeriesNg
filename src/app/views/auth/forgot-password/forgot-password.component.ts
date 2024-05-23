import {Component} from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";
import {AuthService} from "../../../services/auth.service";
import { Router, RouterLink } from "@angular/router";
import { LoginWithSocialsComponent } from '../login-with-socials/login-with-socials.component';
import { BtnLoaderComponent } from '../../../components/btn-loader/btn-loader.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
    imports: [ContainerComponent, FormsModule, NgIf, BtnLoaderComponent, RouterLink, LoginWithSocialsComponent]
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
