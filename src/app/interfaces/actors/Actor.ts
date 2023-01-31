import {BaseModel} from "../BaseModel";
import {Movie} from "../movies/Movie";

export interface Actor extends BaseModel {

  mainImage?: string
  mainThumb?: string
  movies: Movie[];
}
