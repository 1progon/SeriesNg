import {MovieSeason} from "./MovieSeason";
import {MovieEpisode} from "./MovieEpisode";
import {Movie} from "./Movie";
import {Translation} from "./Translation";
import {Quality} from "./Quality";

export interface MovieVideo {
  id: number;

  movie: Movie;
  movieId: number;

  translation: Translation;
  translationId: number;

  quality: Quality;
  qualityId: number;

  createdAt: string;
  updatedAt: string;

  lastSeason?: number;
  lastEpisode?: number;

  seasonsCount?: number;
  episodesCount?: number;

  kodikMovieId?: string;
  kodikLink?: string;

  seasons: MovieSeason[];
  // episodes?: MovieEpisode[];

  hiddenVideo: boolean;
  camrip: boolean;
  lgbt: boolean;
}
