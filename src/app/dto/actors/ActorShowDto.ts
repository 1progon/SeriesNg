import {BaseDto} from "../BaseDto";
import {MovieDto} from "../movies/MovieDto";

export interface ActorShowDto extends BaseDto {
  mainThumb?: string;
  movies: MovieDto[];
}
