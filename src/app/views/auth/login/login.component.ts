import {Component, OnInit} from '@angular/core';
import {LoginFormDto} from "../../../dto/auth/LoginFormDto";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private service: AuthService) {
  }

  form: LoginFormDto = <LoginFormDto>{}

  ngOnInit(): void {
  }


  submit() {
    console.log(this.form);

    this.service.login(this.form).subscribe({
      next: data => {

      }
    })
  }
}
