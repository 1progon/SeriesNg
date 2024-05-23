import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {MoviesService} from "../../../services/movies.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {Title} from "@angular/platform-browser";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {MoviesSelector} from "../../../enums/movies/MoviesSelector";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {MovieDto} from "../../../dto/movies/MovieDto";
import {PaginationComponent} from '../../../components/pagination/pagination.component';
import {MoviesIndexListComponent} from '../include/movies-index-list/movies-index-list.component';
import {MoviesIndexListHeadComponent} from '../include/movies-index-list-head/movies-index-list-head.component';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {isPlatformBrowser, NgIf} from '@angular/common';
import {BreadcrumbComponent} from '../../../components/breadcrumb/breadcrumb.component';
import {ContainerComponent} from '../../../components/container/container.component';

@Component({
  selector: 'app-movies-index',
  templateUrl: './movies-index.component.html',
  styleUrls: ['./movies-index.component.scss'],
  standalone: true,
  imports: [ContainerComponent, BreadcrumbComponent, NgIf, LoaderComponent, MoviesIndexListHeadComponent, MoviesIndexListComponent, PaginationComponent]
})
export class MoviesIndexComponent implements OnInit {

  isBrowser = false;
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

  constructor(private service: MoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private titleService: Title,
              private htmlS: HtmlHeadOptionsService) {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID))
  }

  getMoviesFromService(search?: string) {
    let offset = (this.page - 1) * this.service.defaultLimit;
    let selector = (this.selectorNumber > 0) ? this.selectorNumber : undefined;

    this.imagesLoaded = [];

    this.service.getMovies(
      offset,
      this.service.defaultLimit,
      selector,
      search)
      .subscribe({
        next: data => {
          this.movies = data;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status == HttpStatusCode.NotFound) {
            this.router.navigateByUrl('/404', {replaceUrl: true}).finally();
          }
        }
      }).add(() => this.loading = false)
  }


  ngOnInit(): void {

    this.route.queryParams.subscribe({
      next: queries => {
        this.searchQuery = queries['search'];

        if (this.isBrowser) {
          document.body.scrollIntoView();
        }

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


        setTimeout(() => {
          this.titleService.setTitle(seoTitle + ' Стр. ' + this.page);
          this.htmlS.setCanonical(canonical);
        }, 0)

        this.loading = true;
        this.getMoviesFromService(this.searchQuery);
      }
    })


  }

  updateRandom() {
    this.getMoviesFromService();
  }
}
