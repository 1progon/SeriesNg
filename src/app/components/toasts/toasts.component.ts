import {Component, OnInit} from '@angular/core';
import {ToastsService} from "../../services/toasts.service";
import {ToastType} from "../../enums/ToastType";
import { NgIf, NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-toasts',
    templateUrl: './toasts.component.html',
    styleUrls: ['./toasts.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, NgClass]
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
