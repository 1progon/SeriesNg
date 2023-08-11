import {Component, OnInit} from '@angular/core';
import {Movie} from "../../../interfaces/movies/Movie";
import {MoviesService} from "../../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {MoviesSelector} from "../../../enums/movies/MoviesSelector";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {MovieDto} from "../../../dto/movies/MovieDto";

@Component({
  selector: 'app-movies-index',
  templateUrl: './movies-index.component.html',
  styleUrls: ['./movies-index.component.scss']
})
export class MoviesIndexComponent implements OnInit {


  constructor(private service: MoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private htmlS: HtmlHeadOptionsService) {
  }

  movies: MovieDto[] = [];
  page = 1;

  crumbs?: Breadcrumb[] = [
    {path: '/movies', name: 'Кино и сериалы, дорамы'}
  ];

  loading: boolean = false;

  imagesLoaded: boolean[] = [];

  moviesSelector: typeof MoviesSelector = MoviesSelector;

  selectorPath?: string = '';
  selectorNumber: MoviesSelector = MoviesSelector.undefined;

  routePath: any[] = ['/movies'];
  searchQuery?: string;


  getMoviesFromService(search?: string) {
    let offset = (this.page - 1) * this.service.defaultLimit;

    this.imagesLoaded = [];

    this.service.getMovies(
      offset,
      this.service.defaultLimit,
      this.selectorNumber,
      search)
      .subscribe({
        next: data => {
          this.movies = data;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == 404) {
            this.router.navigateByUrl('/404').finally();
          }
        }
      }).add(() => this.loading = false)
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe({
      next: queries => {
        this.searchQuery = queries['search'];

        document.body.scrollIntoView();

        let page = parseInt(queries['page']);
        this.page = isNaN(page) ? 1 : page;

        this.crumbs = [
          {path: '/movies', name: 'Дорамы, сериалы, кино'},
        ];

        let canonical = 'movies';


        this.selectorPath = this.route.routeConfig?.path;
        if (this.selectorPath) {
          this.selectorNumber = (<any>MoviesSelector)[this.selectorPath];
          this.crumbs.push({
            path: '/movies/' + this.selectorPath, name: this.route.routeConfig?.title?.toString() ?? ''
          });
        }

        let seoTitle = 'Все дорамы.';
        this.crumbs.push({name: 'Стр.' + this.page});

        this.routePath = ['/movies'];

        if (this.selectorPath) {
          this.routePath.push(this.selectorPath);
          seoTitle += ' ' + this.route.routeConfig?.title;
          canonical += '/' + this.selectorPath;
        }

        if (this.page > 1) {
          canonical += '?page=' + this.page;
        }

        this.titleService.setTitle(seoTitle + ' Стр. ' + this.page);
        this.htmlS.setCanonical(canonical);

        this.loading = true;
        this.getMoviesFromService(this.searchQuery);

      }
    })


  }

  updateRandom() {
    this.getMoviesFromService();
  }
}
