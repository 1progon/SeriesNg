import {BaseModel} from "../BaseModel";
import {Movie} from "./Movie";

export interface Anthology extends BaseModel {
  movies?: Movie[];
}
