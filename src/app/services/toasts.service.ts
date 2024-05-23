import {Injectable} from '@angular/core';
import {Toast} from "../interfaces/Toast";
import {ToastType} from "../enums/ToastType";

@Injectable({
  providedIn: 'root'
})
export class ToastsService {

  private _toasts: Toast[] = [];
  private timeOut = 2000;

  private setTimeOutIds: NodeJS.Timeout[] = [];

  constructor() {
  }

  get toasts(): Toast[] {
    return this._toasts;
  }


  pushToast(message: { message: string, type: ToastType }) {

    let toast = message as Toast;
    toast.id = Date.now();

    switch (toast.type) {
      case ToastType.Success:
        toast.title = 'Успешно';
        break;
      case ToastType.Danger:
        toast.title = 'Проблема';
        break;
      case ToastType.Warning:
        toast.title = 'Внимание';
        break;
      case ToastType.Info:
        toast.title = 'Информация';
        break;
      default:
        toast.title = 'Сообщение';
        break;

    }


    let maxToasts = 50;
    if (this._toasts.length > maxToasts) {
      let deleteCount = this._toasts.length - maxToasts;

      this._toasts.splice(0, deleteCount);
      this.setTimeOutIds.splice(0, deleteCount);
    }

    // push new toast to array
    this._toasts.push(toast);

    // remove toast from array with delay
    let id = setTimeout(() => {
      this._toasts.shift();
      this.setTimeOutIds.shift();
    }, this.timeOut * (this._toasts.length + 1));

    this.setTimeOutIds.push(id);
  }


  removeToast(id: number) {
    this._toasts = this._toasts.filter(value => value.id != id);

    this.setTimeOutIds.forEach(value => {
      clearTimeout(value);
    })
  }


  removeAllToasts() {
    this._toasts = [];
  }
}
