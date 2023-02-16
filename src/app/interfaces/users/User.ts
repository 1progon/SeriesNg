import {UserFavoriteMovie} from "../middle/UserFavoriteMovie";

export interface User {
  id: number;
  guid: string;

  email: string;
  password: string;

  token?: string;
  tokenExpire?: string;

  favoriteMovies: UserFavoriteMovie[];

}
