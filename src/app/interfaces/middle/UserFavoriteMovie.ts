import {Movie} from "../movies/Movie";
import {User} from "../users/User";

export interface UserFavoriteMovie {
  movie: Movie;
  movieId: number;


  user: User;
  userId: number;
}
