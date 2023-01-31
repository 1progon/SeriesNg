import {Component, OnInit} from '@angular/core';
import {CollectionsService} from "../../../services/collections.service";
import {Collection} from "../../../interfaces/movies/Collection";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-collections-index',
  templateUrl: './collections-index.component.html',
  styleUrls: ['./collections-index.component.scss']
})
export class CollectionsIndexComponent implements OnInit {


  constructor(private service: CollectionsService) {
  }

  collections: Collection[] = [];
  loading: boolean = false;
  crumbs: Breadcrumb[] = [];
  imagesLoaded: boolean[] = [];
  imagesPath: string = environment.imagesPath;

  ngOnInit(): void {
    this.service.getCollections().subscribe({
      next: data => {
        this.loading = true;
        this.collections = data;

        this.crumbs = [
          {path: '/movies' ,name: 'Кино и сериалы, дорамы'},
          {name: 'Подборки кино и сериалов'},
        ];

      }
    }).add(() => this.loading = false)
  }
}
