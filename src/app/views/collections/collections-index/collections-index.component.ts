import {Component, OnInit} from '@angular/core';
import {CollectionsService} from "../../../services/collections.service";
import {Collection} from "../../../interfaces/movies/Collection";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {RouterLink} from '@angular/router';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {NgFor, NgIf} from '@angular/common';
import {BreadcrumbComponent} from '../../../components/breadcrumb/breadcrumb.component';
import {ContainerComponent} from '../../../components/container/container.component';

@Component({
  selector: 'app-collections-index',
  templateUrl: './collections-index.component.html',
  styleUrls: ['./collections-index.component.scss'],
  standalone: true,
  imports: [ContainerComponent, BreadcrumbComponent, NgIf, LoaderComponent, NgFor, RouterLink]
})
export class CollectionsIndexComponent implements OnInit {
  collections: Collection[] = [];
  loading: boolean = false;
  crumbs: Breadcrumb[] = [];
  imagesLoaded: boolean[] = [];
  imagesPath: string = environment.imagesPath;

  constructor(private service: CollectionsService,
              private htmlS: HtmlHeadOptionsService) {
  }


  ngOnInit(): void {
    this.htmlS.setCanonical('movies/collections');

    this.loading = true;
    this.service.getCollections()
      .subscribe({
        next: data => {

          this.collections = data;

          this.crumbs = [
            {path: '/movies', name: 'Кино и сериалы, дорамы'},
            {name: 'Подборки дорам, кино и сериалов'},
          ];

        }
      }).add(() => this.loading = false)
  }
}
