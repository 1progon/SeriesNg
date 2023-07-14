import {Component, OnInit} from '@angular/core';
import {Genre} from "../../../interfaces/movies/Genre";
import {environment} from "../../../../environments/environment";
import {GenresService} from "../../../services/genres.service";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";

@Component({
  selector: 'app-genres-index',
  templateUrl: './genres-index.component.html',
  styleUrls: ['./genres-index.component.scss']
})
export class GenresIndexComponent implements OnInit {
  genres: Genre[] = [];
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
    // scroll into top
    document.body.scrollIntoView();

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
