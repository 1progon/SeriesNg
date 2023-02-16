import {MovieLikeDislikeType} from "../../enums/movies/MovieLikeDislikeType";
import {Movie} from "../movies/Movie";
import {User} from "../users/User";

export interface UserMovieLikeDislike {
  movieId: number;
  movie: Movie;

  userId: number;
  user: User;

  type: MovieLikeDislikeType;
}
