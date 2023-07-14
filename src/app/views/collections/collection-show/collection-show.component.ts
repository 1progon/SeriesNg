import {Component, OnInit} from '@angular/core';
import {CollectionsService} from "../../../services/collections.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection} from "../../../interfaces/movies/Collection";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {Title} from "@angular/platform-browser";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";

@Component({
  selector: 'app-collection-show',
  templateUrl: './collection-show.component.html',
  styleUrls: ['./collection-show.component.scss']
})
export class CollectionShowComponent implements OnInit {

  constructor(private service: CollectionsService,
              private route: ActivatedRoute,
              private titleS: Title,
              private router: Router,
              private htmlS: HtmlHeadOptionsService) {
  }

  collection: Collection = <Collection>{};
  loading = false;
  crumbs: Breadcrumb[] = [];

  imagesLoaded: boolean[] = [];
  imagesPath = environment.imagesPath;
  page: number = 1;
  limit = 28;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: query => {
        this.loading = true;
        document.body.scrollIntoView();
        this.imagesLoaded = [];
        let number = parseInt(query['page']);
        this.page = isNaN(number) ? 1 : number;

        this.route.params.subscribe({
          next: params => {
            let slug = params['slug'];
            let offset = (this.page - 1) * this.limit;
            this.service.getCollection(slug, offset)
              .subscribe({
                next: data => {
                  this.collection = data;
                  this.titleS.setTitle('Подборка дорам ' + data.name);

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
                error: () => {
                  if (this.page > 1 && !this.collection.movies) {
                    this.router.navigate(['/', 'collections', slug]).finally();
                  }

                  this.collection.movies = [];
                }
              }).add(() => this.loading = false)

          }
        })
      }
    })

  }

}
