import {Movie} from "./Movie";
import {User} from "../users/User";

export interface Comment {
  id: number;
  title: string;
  message: string;
  rating: number;
  ratingCount: number;
  movie: Movie;
  movieId: number;
  author: User;
  authorId: number;
}
