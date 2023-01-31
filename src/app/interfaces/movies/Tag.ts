import {BaseModel} from "../BaseModel";
import {Movie} from "./Movie";

export interface Tag extends BaseModel{
  movies: Movie[];
}
