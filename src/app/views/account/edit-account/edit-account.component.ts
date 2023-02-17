import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {UserDto} from "../../../dto/users/UserDto";
import {UpdateUserDto} from "../../../dto/users/UpdateUserDto";
import {UsersService} from "../../../services/users.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastsService} from "../../../services/toasts.service";
import {ToastType} from "../../../enums/ToastType";

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {


  constructor(private authService: AuthService,
              private usersService: UsersService,
              private toastService: ToastsService) {
  }

  user?: UserDto;
  updateUserForm: UpdateUserDto = <UpdateUserDto>{};

  changePassword: boolean = false;

  passMinLength = 5;
  changeEmail: boolean = true;

  showPasswords: boolean = false;

  submitting = false;

  setDefaultUserValues() {
    for (let key in this.user) {
      this.updateUserForm[key] = this.user[key];
    }
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    if (this.user) {
      this.setDefaultUserValues();
    }
  }

  submit() {
    this.submitting = true;


    for (let key in this.updateUserForm) {
      if (this.updateUserForm[key] && typeof this.updateUserForm[key] == "string") {
        this.updateUserForm[key] = this.updateUserForm[key].trim();
      }
    }


    this.usersService.updateUser(this.updateUserForm)
      .subscribe({
        next: value => {
          this.user = value;
          this.setDefaultUserValues();
          this.toastService.pushToast({
            message: 'Данные обновлены',
            type: ToastType.Success,
          })


        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
        }
      })
      .add(() => this.submitting = false)


  }
}
