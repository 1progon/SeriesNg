import {MovieEpisode} from "./MovieEpisode";
import {MovieVideo} from "./MovieVideo";

export interface MovieSeason {
  id: number;
  name?: string;

  seasonNumber: number;

  movieVideo: MovieVideo;
  movieVideoId: number;

  kodikLink?: string;

  episodes: MovieEpisode[];
}
