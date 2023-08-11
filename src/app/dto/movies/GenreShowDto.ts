import {BaseDto} from "../BaseDto";
import {MovieDto} from "./MovieDto";

export interface GenreShowDto extends BaseDto {
  movies: MovieDto[];
}
