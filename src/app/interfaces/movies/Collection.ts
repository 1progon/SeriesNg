import {BaseModel} from "../BaseModel";
import {Movie} from "./Movie";

export interface Collection extends BaseModel {
  thumb?: string;
  movies: Movie[];
}
