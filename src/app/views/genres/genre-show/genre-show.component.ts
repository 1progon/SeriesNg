import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {GenresService} from "../../../services/genres.service";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {GenreShowDto} from "../../../dto/movies/GenreShowDto";
import {RNames} from "../../../enums/RoutesNames";
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { MoviesIndexListComponent } from '../../movies/include/movies-index-list/movies-index-list.component';
import { MoviesIndexListHeadComponent } from '../../movies/include/movies-index-list-head/movies-index-list-head.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { NgIf } from '@angular/common';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-genre-show',
    templateUrl: './genre-show.component.html',
    styleUrls: ['./genre-show.component.scss'],
    standalone: true,
    imports: [ContainerComponent, BreadcrumbComponent, NgIf, LoaderComponent, MoviesIndexListHeadComponent, MoviesIndexListComponent, PaginationComponent]
})
export class GenreShowComponent implements OnInit {
  slug?: string;
  page = 1;
  loading = false;
  genre = <GenreShowDto>{
    name: ''
  };
  imagesLoaded: boolean[] = [];
  limit = 28;
  crumbs?: Breadcrumb[];

  constructor(private titleS: Title,
              private route: ActivatedRoute,
              private genreS: GenresService,
              private router: Router,
              private htmlS: HtmlHeadOptionsService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe({
        next: query => {
          // scroll to top
          document.body.scrollIntoView();

          // get page number
          let number = parseInt(query['page']);
          this.page = isNaN(number) ? 1 : number;

          this.route.params
            .subscribe({
              next: params => {

                this.slug = params[RNames.slug];
                if (!this.slug || this.loading) return;

                // start loading
                this.loading = true;

                // loaded images to empty
                this.imagesLoaded = [];

                // get offset
                let offset = (this.page - 1) * this.limit;

                // get data from service
                this.genreS.getGenre(this.slug, offset)
                  .subscribe({
                    next: data => {
                      this.genre = data;

                      let seoTitle = 'Дорамы в жанре ' + data.name;

                      if (this.page > 1) {
                        seoTitle += '. Стр. ' + this.page;
                      }

                      // set meta
                      this.titleS.setTitle(seoTitle);


                      // set canonical in head
                      let canonical = 'genres/' + this.slug;
                      if (this.page > 1) {
                        canonical += '?page=' + this.page;
                      }
                      this.htmlS.setCanonical(canonical);

                      // gen crumbs
                      this.crumbs = [
                        {path: 'genres/', name: 'Жанры дорам'},
                        {path: '', name: 'Жанр дорам ' + this.genre.name},
                      ];

                    },
                    error: (err: HttpErrorResponse) => {
                      if (err.status == HttpStatusCode.NotFound) {
                        this.router.navigateByUrl('/404', {replaceUrl: true}).finally();
                      }
                    }
                  })
                  .add(() => this.loading = false)


              }
            })
        }
      })


  }


}
