export interface UpdateUserDto {
  [index: string]: any;

  email: string;

  guid: string;
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

  password?: string;
  passwordConfirm?: string;

}
