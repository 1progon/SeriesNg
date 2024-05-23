import {afterRender, Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {GenresService} from "../../../services/genres.service";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {GenreDto} from "../../../dto/movies/GenreDto";
import {RouterLink} from '@angular/router';
import {LoaderComponent} from '../../../components/loader/loader.component';
import {NgFor, NgIf} from '@angular/common';
import {BreadcrumbComponent} from '../../../components/breadcrumb/breadcrumb.component';
import {ContainerComponent} from '../../../components/container/container.component';

@Component({
  selector: 'app-genres-index',
  templateUrl: './genres-index.component.html',
  styleUrls: ['./genres-index.component.scss'],
  standalone: true,
  imports: [ContainerComponent, BreadcrumbComponent, NgIf, LoaderComponent, NgFor, RouterLink]
})
export class GenresIndexComponent implements OnInit {
  genres: GenreDto[] = [];
  imagesLoaded: boolean[] = [];
  imagesPath = environment.imagesPath;
  loading: boolean = false;
  crumbs?: Breadcrumb[] = [
    {path: '', name: 'Все жанры дорам'}
  ];


  constructor(private genresService: GenresService,
              private htmlS: HtmlHeadOptionsService) {
    afterRender(() => document.body.scrollIntoView())
  }

  ngOnInit(): void {
    this.htmlS.setCanonical('genres');


    // start loading
    this.loading = true;


    // get genres from service
    this.genresService.getGenres()
      .subscribe({
        next: data => {
          this.genres = data;
        }
      })
      .add(() => this.loading = false)

  }


}
