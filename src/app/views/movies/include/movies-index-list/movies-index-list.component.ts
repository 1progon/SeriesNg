import {Component, Input} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MovieDto} from "../../../../dto/movies/MovieDto";

@Component({
  selector: 'app-movies-index-list',
  templateUrl: './movies-index-list.component.html',
  styleUrls: ['./movies-index-list.component.scss']
})
export class MoviesIndexListComponent {
  @Input() movies: MovieDto[] = [];
  @Input() imagesLoaded: boolean[] = [];
  @Input() loading: boolean = false;

  imagesPath: string = environment.imagesPath;


}
