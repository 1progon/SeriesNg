import {Component, OnInit} from '@angular/core';
import {CollectionsService} from "../../../services/collections.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection} from "../../../interfaces/movies/Collection";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {Title} from "@angular/platform-browser";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import {RNames} from "../../../enums/RoutesNames";
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { MoviesIndexListComponent } from '../../movies/include/movies-index-list/movies-index-list.component';
import { MoviesIndexListHeadComponent } from '../../movies/include/movies-index-list-head/movies-index-list-head.component';
import { LoaderComponent } from '../../../components/loader/loader.component';
import { NgIf } from '@angular/common';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-collection-show',
    templateUrl: './collection-show.component.html',
    styleUrls: ['./collection-show.component.scss'],
    standalone: true,
    imports: [ContainerComponent, BreadcrumbComponent, NgIf, LoaderComponent, MoviesIndexListHeadComponent, MoviesIndexListComponent, PaginationComponent]
})
export class CollectionShowComponent implements OnInit {

  constructor(private service: CollectionsService,
              private route: ActivatedRoute,
              private titleS: Title,
              private router: Router,
              private htmlS: HtmlHeadOptionsService) {
  }

  collection: Collection = <Collection>{
    name: ''
  };
  loading = false;
  crumbs: Breadcrumb[] = [];

  imagesLoaded: boolean[] = [];
  page: number = 1;
  limit = 28;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: query => {
        let number = parseInt(query['page']);
        this.page = isNaN(number) ? 1 : number;

        document.body.scrollIntoView();

        this.route.params.subscribe({
          next: params => {
            let slug = params[RNames.slug];
            let offset = (this.page - 1) * this.limit;

            this.loading = true;
            this.imagesLoaded = [];

            this.service.getCollection(slug, offset)
              .subscribe({
                next: data => {
                  this.collection = data;
                  let title = 'Подборка дорам ' + data.name;
                  if (this.page > 1) {
                    title += '. Стр. ' + this.page;
                  }

                  this.titleS.setTitle(title);

                  // set canonical in head
                  let canonical = 'collections/' + slug;
                  if (this.page > 1) {
                    canonical += '?page=' + this.page;
                  }
                  this.htmlS.setCanonical(canonical);

                  this.crumbs = [
                    {path: 'movies/collections', name: 'Подборки дорам, кино и сериалов'},
                    {path: '', name: 'Подборка дорам ' + this.collection.name},
                  ];
                },
                error: (err: HttpErrorResponse) => {
                  if (err.status == HttpStatusCode.NotFound) {
                    this.router.navigateByUrl('/404', {replaceUrl: true}).finally();
                  }
                }
              }).add(() => this.loading = false)

          }
        })
      }
    })

  }

}
