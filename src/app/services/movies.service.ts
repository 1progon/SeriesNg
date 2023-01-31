import {Injectable} from '@angular/core';
import {Movie} from "../interfaces/movies/Movie";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {GetMovieShowDto} from "../dto/movies/GetMovieShowDto";
import {MovieVideo} from "../interfaces/movies/MovieVideo";
import {map, Observable, of, Subject} from "rxjs";
import {MoviesSelector} from "../enums/movies/MoviesSelector";
import {GetMovieVideoDto} from "../dto/movies/GetMovieVideoDto";
import {MovieEpisode} from "../interfaces/movies/MovieEpisode";
import {MovieSeason} from "../interfaces/movies/MovieSeason";
import {CacheMovieVideo} from "../interfaces/caches/CacheMovieVideo";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) {
  }


  cacheMovieVideo?: CacheMovieVideo;

  cacheIndexMovies: { name: string, movies: Movie[] }[] = [];

  activeMovieVideo: Subject<MovieVideo> = new Subject<MovieVideo>();
  activeSeason?: MovieSeason;
  activeEpisode?: MovieEpisode;


  defaultLimit = 28;

  getMovies(offset: number = 0,
            limit: number = this.defaultLimit,
            selector?: MoviesSelector,
            search?: string) {

    let cacheName = `movies-offset-${offset}-limit-${limit}-selector-${selector}-search-${search}`;
    if (this.cacheIndexMovies.length > 0) {
      let cache = this.cacheIndexMovies.find(value => value.name == cacheName);
      if (cache && selector != MoviesSelector.random) {
        return of(cache.movies);
      }

    }

    let params: HttpParams = new HttpParams();

    if (limit != this.defaultLimit) {
      params = params.append('limit', limit);
    }

    if (offset != 0) {
      params = params.append('offset', offset);
    }

    if (selector != undefined) {
      params = params.append('selector', selector);
    }

    if (search) {
      params = params.append('search', search);
    }


    return this.http.get<Movie[]>(environment.apiUrl + 'movies',
      {params})
      .pipe(map(value => {
        if (selector != MoviesSelector.random) {
          this.cacheIndexMovies.push({name: cacheName, movies: value});
        }
        return value;
      }));
  }

  getMovie(slug: string): Observable<GetMovieShowDto> {
    return this.http.get<GetMovieShowDto>(environment.apiUrl + 'movies/' + slug);
  }

  getMovieVideo(movieSlug: string,
                movieVideoId?: number) {
    let cacheName = `movie-video-slug-${movieSlug}-video-id-${movieVideoId}`;
    // if (this.cacheMovieVideo?.name == cacheName) {
    // this.activeMovieVideo.next(this.cacheMovieVideo.dto.video);
    // return of(this.cacheMovieVideo.dto);
    // }

    let params = new HttpParams();

    if (movieVideoId) {
      params = params.append('v', movieVideoId);
    }

    return this.http
      .get<GetMovieVideoDto>(environment.apiUrl + 'movieVideo/' + movieSlug, {params})
      .pipe(map(value => {
        // this.cacheMovieVideo = {dto: value, name: cacheName};
        this.activeMovieVideo.next(value.video);
        return value;
      }));
  }
}
