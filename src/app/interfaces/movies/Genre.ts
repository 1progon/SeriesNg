import {BaseModel} from "../BaseModel";
import {Movie} from "./Movie";

export interface Genre extends BaseModel {
  movies: Movie[];
}
