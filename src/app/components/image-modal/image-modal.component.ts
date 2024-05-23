import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SafeResourceUrl} from "@angular/platform-browser";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.scss'],
    standalone: true,
    imports: [NgIf]
})
export class ImageModalComponent {
  @Input() image?: SafeResourceUrl;
  @Output() onCloseModal: EventEmitter<any> = new EventEmitter();

  constructor() {

  }


  onClickImage() {
    this.onCloseModal.emit();

  }
}
