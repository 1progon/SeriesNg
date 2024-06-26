import {Component, OnInit} from '@angular/core';
import {LoginFormDto} from "../../../dto/auth/LoginFormDto";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private service: AuthService,
              private router: Router) {
  }

  form: LoginFormDto = <LoginFormDto>{}

  loading: boolean = false;

  errors?: HttpErrorResponse;
  friendlyError?: string;

  ngOnInit(): void {
    if (this.service.user) {
      this.router.navigateByUrl('/account').finally();
      return;
    }

    document.body.scrollIntoView();
  }


  submit() {
    this.loading = true;
    this.errors = undefined;

    let randomTimeout = Math.floor(Math.random() * 1001 + 1000);
    setTimeout(() => {
      this.service.login(this.form)
        .subscribe({
          next: data => {
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
