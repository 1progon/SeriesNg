import {Component, OnInit} from '@angular/core';
import {RegisterFormDto} from "../../../dto/auth/RegisterFormDto";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private service: AuthService,
              private router: Router) {
  }

  form: RegisterFormDto = <RegisterFormDto>{}
  errors?: HttpErrorResponse;
  friendlyError?: string;
  loading: boolean = false;
  showPasswords: boolean = false;

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
