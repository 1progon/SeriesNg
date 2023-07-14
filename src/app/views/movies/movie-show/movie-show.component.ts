import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Movie} from "../../../interfaces/movies/Movie";
import {Meta, Title} from "@angular/platform-browser";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {MovieType} from "../../../enums/movies/MovieType";
import {AuthService} from "../../../services/auth.service";
import {ToastsService} from "../../../services/toasts.service";
import {ToastType} from "../../../enums/ToastType";
import {MovieLikeDislikeType} from "../../../enums/movies/MovieLikeDislikeType";

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.scss']
})
export class MovieShowComponent implements OnInit {


  constructor(public moviesService: MoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private metaService: Meta,
              public authService: AuthService,
              private toastService: ToastsService) {


  }

  imagesPath = environment.imagesPath;

  movie: Movie = <Movie>{};

  // linkToWatch: string = '';

  movieTypes: typeof MovieType = MovieType;

  starsColored: number[] = [];
  nonColoredStars: number[] = [];

  loading: boolean = false;

  crumbs?: Breadcrumb[];

  loadedImages: boolean[] = [];
  imageLoaded: boolean = false;


  // favorite movie
  isUserFavoriteMovie: boolean = false;
  isUpdateFavoritesStatus = false;


  // likes dislikes
  isUpdateMovieLikeDislike = false;

  LikeTypesEnum = MovieLikeDislikeType;

  movieLikeType?: MovieLikeDislikeType;


  compareMoviesSort(a: Movie, b: Movie): number {
    if (a.year < b.year) {
      return -1;
    }

    if (a.year > b.year) {
      return 1;
    }

    if (a.year == b.year) {
      if (a.premierDate && b.premierDate) {
        let aPremier = a.premierDate.toUpperCase();
        let bPremier = b.premierDate.toUpperCase();

        return aPremier < bPremier ? -1 : 1;

      }

    }

    return 0;
  }

  ngOnInit(): void {

    this.route.params.subscribe({
      next: params => {
        this.loading = true;
        this.imageLoaded = false;
        this.moviesService.getMovie(params['movieSlug']).subscribe({
          next: data => {
            document.body.scrollIntoView();
            this.movie = data.movie;
            this.movie.anthology = data.anthology;

            if (this.movie && this.movie.anthology.movies?.length) {
              this.movie.anthology.movies = this.movie.anthology.movies
                .sort(this.compareMoviesSort)
            }

            this.crumbs = [
              {path: 'movies', name: 'Дорамы, сериалы, кино'},
              {path: '', name: 'Дорама ' + this.movie.name},
            ];

            // add meta
            this.titleService.setTitle('Дорама ' + this.movie.name);
            this.metaService.updateTag({
              name: 'description',
              content: 'Дорама ' + this.movie.name + ' информация и смотреть онлайн бесплатно'
            });

            let movieNameLower = this.movie.name.toLowerCase();
            this.metaService.updateTag({
              name: 'keywords',
              content: 'дорама ' + movieNameLower + ', смотреть дораму ' + movieNameLower
            });
            // end add meta

            // switch (this.movie.type) {
            //   case MovieType.ManySeriesMovie:
            //     this.linkToWatch = `/movies/${this.movie.slug}/episode/1`;
            //     break;
            //   case MovieType.SeriesWithSeasons:
            //     this.linkToWatch = `/movies/${this.movie.slug}/season/1/episode/1`;
            //     break;
            //   case MovieType.SingleMovie:
            //     this.linkToWatch = `#player-single`;
            //     this.episodeLink = this.san.bypassSecurityTrustResourceUrl(this.movie.kodikLink ?? '');
            //     break;
            // }

            // generate stars
            this.starsColored = Array<number>(Math.floor(this.movie.rating ?? 0))
              .fill(0);
            this.nonColoredStars = Array<number>(5 - Math.floor(this.movie.rating ?? 0))
              .fill(0);
            // end generate stars


            if (this.authService.user) {

              // set user favorite heart
              if (data.movie.usersFavorites.length) {
                this.isUserFavoriteMovie = this.movie
                  .usersFavorites?.[0]?.movieId == data.movie.id;
              }


              // set user like dislike
              if (data.movie.usersLikes.length && data.movie.usersLikes[0].movieId == data.movie.id) {
                this.movieLikeType = data.movie.usersLikes[0].type;
              }
            }


          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 404) {
              this.router.navigateByUrl('/404').finally();
            }
          }
        }).add(() => this.loading = false)
      }
    })
  }

  addMovieToUserFavorites() {
    if (!this.authService.user) {
      this.toastService.pushToast({
        type: ToastType.Info,
        message: 'Войдите или зарегистрируйтесь, чтобы добавлять в избранное'
      })
      return;
    }

    if (this.isUpdateFavoritesStatus) {
      return;
    }

    this.isUpdateFavoritesStatus = true;

    setTimeout(() => {
      this.moviesService.addUserFavoriteMovie(this.movie.id)
        .subscribe({
          next: () => {
            this.isUserFavoriteMovie = true;
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.Conflict) {
              this.isUserFavoriteMovie = true;
            }
            this.toastService.pushToast({
              type: ToastType.Danger,
              message: err.error.message
            })
          }
        })
        .add(() => this.isUpdateFavoritesStatus = false)
    }, 500)


  }

  removeFromFavorites() {
    if (this.isUpdateFavoritesStatus) {
      return;
    }
    this.isUpdateFavoritesStatus = true;

    setTimeout(() => {
      this.moviesService.removeUserFavoriteMovie(this.movie.id)
        .subscribe({
          next: value => {
            this.isUserFavoriteMovie = false;
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.Conflict) {
              this.isUserFavoriteMovie = false;
            }

            this.toastService.pushToast({
              type: ToastType.Danger,
              message: err.error.message
            });
          }
        })
        .add(() => this.isUpdateFavoritesStatus = false)
    }, 500)

  }

  addMovieLikeDislike(type: MovieLikeDislikeType) {
    if (!this.authService.user) {
      this.toastService.pushToast({
        type: ToastType.Info,
        message: 'Войдите или зарегистрируйтесь, чтобы ставить Лайки и Дизлайки'
      })

      return;
    }

    if (this.isUpdateMovieLikeDislike) {
      return;
    }


    this.isUpdateMovieLikeDislike = true;

    let typeName: string;
    switch (type) {
      case MovieLikeDislikeType.Like:
        typeName = 'Лайк';
        break;
      case MovieLikeDislikeType.Dislike:
        typeName = 'Дизлайк';
        break;
      default:
        return;
    }

    setTimeout(() => {
      this.moviesService.addLikeDislikeToMovie(this.movie.id, type)
        .subscribe({
          next: response => {


            this.movie.likes = response.likes;
            this.movie.disLikes = response.disLikes;


            if (this.movieLikeType == type) {
              this.movieLikeType = MovieLikeDislikeType.Undefined;

              this.toastService.pushToast({
                type: ToastType.Success,
                message: 'Успешно удалён ' + typeName
              })


            } else {
              this.movieLikeType = type;

              this.toastService.pushToast({
                type: ToastType.Success,
                message: 'Успешно добавлен ' + typeName
              })

            }


          },
          error: (err: HttpErrorResponse) => {
            if (err.status == HttpStatusCode.Unauthorized) {
              this.toastService.pushToast({
                type: ToastType.Info,
                message: 'Нужно войти в аккаунт'
              })
              return;
            }

            this.toastService.pushToast({
              type: ToastType.Danger,
              message: 'Что-то пошло не так'
            })

          }
        })
        .add(() => this.isUpdateMovieLikeDislike = false)
    }, 500)

  }


}

