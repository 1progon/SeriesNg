import {Component, Input} from '@angular/core';
import {Movie} from "../../../../interfaces/movies/Movie";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-movies-index-list',
  templateUrl: './movies-index-list.component.html',
  styleUrls: ['./movies-index-list.component.scss']
})
export class MoviesIndexListComponent {
  @Input() movies: Movie[] = [];
  @Input() imagesLoaded: boolean[] = [];
  @Input() loading: boolean = false;

  imagesPath: string = environment.imagesPath;


}
