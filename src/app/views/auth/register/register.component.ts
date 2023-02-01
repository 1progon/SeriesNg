import {Component, OnInit} from '@angular/core';
import {RegisterFormDto} from "../../../dto/auth/RegisterFormDto";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  constructor(private service: AuthService) {
  }

  form: RegisterFormDto = <RegisterFormDto>{}

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form);
    this.service.register(this.form).subscribe({
      next: data => {

      }
    })

  }
}
