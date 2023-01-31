import {Movie} from "../../interfaces/movies/Movie";
import {Actor} from "../../interfaces/actors/Actor";

export interface GetActorShowDto {
  actor: Actor;
  movies?: Movie[];
}
