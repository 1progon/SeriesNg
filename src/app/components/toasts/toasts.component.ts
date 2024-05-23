import {Component} from '@angular/core';
import {ToastsService} from "../../services/toasts.service";
import {ToastType} from "../../enums/ToastType";
import {NgClass, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, NgClass]
})
export class ToastsComponent {

  tTypes: typeof ToastType = ToastType;

  constructor(public toastService: ToastsService) {
  }

  protected removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
