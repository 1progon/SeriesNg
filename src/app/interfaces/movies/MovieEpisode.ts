import {MovieSeason} from "./MovieSeason";
import {MovieVideo} from "./MovieVideo";

export interface MovieEpisode {
  id: number;

  name?: string;

  seriesNumber: number;

  season?: MovieSeason;
  seasonId?: number;

  movie?: MovieVideo;
  movieVideoId?: number;

  kodikLink?: string;
}
