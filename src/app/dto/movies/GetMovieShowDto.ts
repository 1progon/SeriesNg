import {Movie} from "../../interfaces/movies/Movie";
import {Anthology} from "../../interfaces/movies/Anthology";

export interface GetMovieShowDto {
  movie: Movie;
  anthology: Anthology;
}
