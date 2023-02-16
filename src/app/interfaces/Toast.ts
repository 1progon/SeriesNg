import {ToastType} from "../enums/ToastType";

export interface Toast {

  id?: number;
  title?: string;
  message: string;
  type: ToastType;
}
