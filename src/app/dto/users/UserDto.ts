import {UserType} from "../../enums/users/UserType";

export interface UserDto {
  [index: string]: any;

  guid: string;
  email: string;

  gender?: string;
  birthDate?: string;

  firstName?: string;
  lastName?: string;

  phone?: string;

  country?: string;
  region?: string;
  city?: string;

  vkProfile?: string;

  okProfile?: string;


  token: string;
  tokenExpire: number;
  type: UserType;
}
