import {MovieType} from "../../enums/movies/MovieType";
import {BaseModel} from "../BaseModel";
import {Genre} from "./Genre";
import {Tag} from "./Tag";
import {Anthology} from "./Anthology";
import {Comment} from "./Comment";
import {Collection} from "./Collection";
import {MovieVideo} from "./MovieVideo";
import {Actor} from "../actors/Actor";
import {UserFavoriteMovie} from "../middle/UserFavoriteMovie";
import {UserMovieLikeDislike} from "../middle/UserMovieLikeDislike";

export interface Movie extends BaseModel {
  type: MovieType

  otherNames?: string;

  description?: string;

  mainImage?: string;
  mainImageThumb?: string;

  year: number
  premierDate?: string;

  countryString?: string;
  likes: number;
  disLikes: number;

  rating?: number;
  ratingCount?: number;

  seasonsCount?: number;
  episodesCount?: number;

  movieVideos: MovieVideo[];
  genres?: Genre[];
  tags?: Tag[];

  actors?: Actor[];

  anthology: Anthology
  anthologyId?: number;

  comments?: Comment[];

  linkParsedFrom?: string;

  imagesString?: string;
  trailersString?: string;

  collections?: Collection[];

  popular: boolean;
  editorChoice: boolean;
  soon: boolean;
  hiddenMovie: boolean;

  kinopoiskId?: string;
  imdbId?: string;
  mdlId?: string;
  shikimoriId?: string;
  worldartLink?: string;

  usersFavorites: UserFavoriteMovie[];

  usersLikes: UserMovieLikeDislike[];

}

