import {Injectable} from '@angular/core';
import {Movie} from "../interfaces/movies/Movie";
import {environment} from "../../environments/environment";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode } from "@angular/common/http";
import {GetMovieShowDto} from "../dto/movies/GetMovieShowDto";
import {MovieVideo} from "../interfaces/movies/MovieVideo";
import {BehaviorSubject, catchError, map, Observable, of, throwError} from "rxjs";
import {MoviesSelector} from "../enums/movies/MoviesSelector";
import {GetMovieVideoDto} from "../dto/movies/GetMovieVideoDto";
import {MovieEpisode} from "../interfaces/movies/MovieEpisode";
import {MovieSeason} from "../interfaces/movies/MovieSeason";
import {CacheMovieVideo} from "../interfaces/caches/CacheMovieVideo";
import {AuthService} from "./auth.service";
import {MovieLikeDislikeType} from "../enums/movies/MovieLikeDislikeType";
import {MovieDto} from "../dto/movies/MovieDto";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  controller: string = 'Movies';
  api: string = environment.apiUrl + this.controller;

  apiUserFavoriteMovies = environment.apiUrl + 'UserFavoriteMovies';

  cacheMovieVideo?: CacheMovieVideo;

  cacheIndexMovies: { name: string, movies: MovieDto[] }[] = [];
  cacheIndexMoviesMaxLength = 10;

  cacheSingleMovies: { name: string, movie: GetMovieShowDto }[] = [];
  cacheSingleMoviesMaxLength = 10;

  activeMovieVideo = new BehaviorSubject<MovieVideo | undefined>(undefined);
  activeSeason?: MovieSeason;
  activeEpisode?: MovieEpisode;


  defaultLimit = 28;


  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getMovies(offset: number = 0,
            limit: number = this.defaultLimit,
            selector?: MoviesSelector,
            search?: string) {

    let cacheName = `movies-offset-${offset}-limit-${limit}-selector-${selector}-search-${search}`;
    if (this.cacheIndexMovies.length > 0) {
      let fromCache = this.cacheIndexMovies.find(value => value.name == cacheName);
      if (fromCache && selector != MoviesSelector.random) {
        return of(fromCache.movies);
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


    return this.http.get<MovieDto[]>(this.api, {params})
      .pipe(map(movies => {
        if (selector != MoviesSelector.random) {
          if (this.cacheIndexMovies.length >= this.cacheIndexMoviesMaxLength) {
            this.cacheIndexMovies.shift();
          }
          this.cacheIndexMovies.push({name: cacheName, movies});
        }
        return movies;
      }));
  }

  getMovie(slug: string): Observable<GetMovieShowDto> {
    let cacheName = `single-movie-${slug}`;
    if (this.cacheSingleMovies.length > 0) {
      let fromCache = this.cacheSingleMovies.find(value => value.name == cacheName);
      if (fromCache) {
        return of(fromCache.movie);
      }
    }

    let headers = new HttpHeaders();

    if (this.authService.user) {
      headers = headers.append('Authorization', 'Bearer ' + this.authService.user.token);
    }

    return this.http.get<GetMovieShowDto>(this.api + '/' + slug, {headers})
      .pipe(map(
        movie => {
          if (this.cacheSingleMovies.length >= this.cacheSingleMoviesMaxLength) {
            this.cacheSingleMovies.shift();
          }
          this.cacheSingleMovies.push({name: cacheName, movie});

          return movie;
        }
      ))
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


  getUserFavoriteMovies() {
    if (this.authService.user) {

      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + this.authService.user.token);

      return this.http.get<Movie[]>(this.apiUserFavoriteMovies, {headers})
        .pipe(
          catchError((err, caught) => {
            if (err instanceof HttpErrorResponse && err.status == HttpStatusCode.Forbidden) {
              this.authService.logout();
            }

            return caught;
          })
        );

    }

    return throwError(() => {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        error: {message: 'Не аутентифицрован'}
      });
    })

  }

  removeUserFavoriteMovie(movieId: number) {
    if (this.authService.user) {
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + this.authService.user.token);

      return this.http.delete(this.apiUserFavoriteMovies + '/' + movieId,
        {headers})
        .pipe(
          catchError((err, caught) => {
            if (err instanceof HttpErrorResponse && err.status == HttpStatusCode.Unauthorized) {
              this.authService.logout();
            }

            return caught;
          }));

    }

    return throwError(() => {
      throw new HttpErrorResponse({
        status: HttpStatusCode.Unauthorized,
        error: {message: 'Не аутентифицрован'}
      });
    })
  }

  addUserFavoriteMovie(movieId: number) {
    if (!this.authService.user) {

      return throwError(() => {
        throw new HttpErrorResponse({
          status: HttpStatusCode.Unauthorized,
          error: {message: 'Не аутентифицрован'}
        });
      })
    }

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.authService.user.token);

    return this.http.post(this.apiUserFavoriteMovies + '/' + movieId,
      null, {headers})
      .pipe(catchError((err, caught) => {
        if (err instanceof HttpErrorResponse && err.status == HttpStatusCode.Unauthorized) {
          this.authService.logout();
        }
        return caught;
      }))
  }

  addLikeDislikeToMovie(movieId: number, type: MovieLikeDislikeType) {
    if (!this.authService.user) {

      return throwError(() => {
        throw new HttpErrorResponse({
          status: HttpStatusCode.Unauthorized,
          error: {message: 'Нужно войти в аккаунт'}
        });
      })
    }


    let path = this.api + '/AddLikeDislike/' + movieId;

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.authService.user.token);

    return this.http.post<{ likes: number, disLikes: number }>(
      path,
      type,
      {headers})
      .pipe(
        map(value => {
          return value;
        }),
        catchError((err, caught) => {
          if (err instanceof HttpErrorResponse && err.status == HttpStatusCode.Unauthorized) {
            this.authService.logout();
          }

          return caught;
        }))
  }


}
