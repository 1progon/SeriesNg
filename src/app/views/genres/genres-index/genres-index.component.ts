import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {GenresService} from "../../../services/genres.service";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {GenreDto} from "../../../dto/movies/GenreDto";

@Component({
  selector: 'app-genres-index',
  templateUrl: './genres-index.component.html',
  styleUrls: ['./genres-index.component.scss']
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
  }

  ngOnInit(): void {
    this.htmlS.setCanonical('genres');


    // start loading
    this.loading = true;

    // scroll into top
    document.body.scrollIntoView();

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
