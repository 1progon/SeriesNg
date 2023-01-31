import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Movie} from "../../../interfaces/movies/Movie";
import {Meta, Title} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {MovieType} from "../../../enums/movies/MovieType";

@Component({
  selector: 'app-movie-show',
  templateUrl: './movie-show.component.html',
  styleUrls: ['./movie-show.component.scss']
})
export class MovieShowComponent implements OnInit {


  constructor(public service: MoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private metaService: Meta) {


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
        this.service.getMovie(params['movieSlug']).subscribe({
          next: data => {
            document.body.scrollIntoView();
            this.movie = data.movie;
            this.movie.anthology = data.anthology;

            if (this.movie && this.movie.anthology.movies?.length) {
              this.movie.anthology.movies = this.movie.anthology.movies
                .sort(this.compareMoviesSort)
            }

            this.crumbs = [
              {path: 'movies', name: 'Кино и сериалы, дорамы.'},
              {path: '', name: this.movie.name},
            ];

            // add meta
            this.titleService.setTitle(this.movie.name);
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
}

