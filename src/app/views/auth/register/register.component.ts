import {afterRender, Component, OnInit} from '@angular/core';
import {RegisterFormDto} from "../../../dto/auth/RegisterFormDto";
import {AuthService} from "../../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginWithSocialsComponent} from '../login-with-socials/login-with-socials.component';
import {BtnLoaderComponent} from '../../../components/btn-loader/btn-loader.component';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ContainerComponent} from '../../../components/container/container.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [ContainerComponent, FormsModule, NgIf, BtnLoaderComponent, RouterLink, LoginWithSocialsComponent]
})
export class RegisterComponent implements OnInit {
  form: RegisterFormDto = <RegisterFormDto>{}
  errors?: HttpErrorResponse;
  friendlyError?: string;
  loading: boolean = false;
  showPasswords: boolean = false;

  constructor(private service: AuthService,
              private router: Router) {
    afterRender(() => document.body.scrollIntoView())
  }


  ngOnInit(): void {
    if (this.service.user) {
      this.router.navigateByUrl('/account').finally();
      return;
    }


  }

  submit() {
    this.loading = true;
    this.errors = undefined;

    let randomTimeout = Math.floor(Math.random() * 1001 + 1000);
    setTimeout(() => {
      this.service.register(this.form)
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/account').finally();
            return;
          },
          error: (err: HttpErrorResponse) => {
            this.errors = err;

            if (err.status == 404) {
              this.router.navigateByUrl('/404').finally();
              return;
            }

            this.friendlyError = err.error.message;


          }
        })
        .add(() => this.loading = false)
    }, randomTimeout)


  }
}
