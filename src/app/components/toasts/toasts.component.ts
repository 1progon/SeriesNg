import {Component, OnInit} from '@angular/core';
import {ToastsService} from "../../services/toasts.service";
import {ToastType} from "../../enums/ToastType";

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  tTypes: typeof ToastType = ToastType;

  constructor(public toastService: ToastsService) {
  }

  ngOnInit(): void {
  }


  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
