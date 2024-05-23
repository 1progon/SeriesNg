import {Component, Input} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {MovieDto} from "../../../../dto/movies/MovieDto";
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-movies-index-list',
    templateUrl: './movies-index-list.component.html',
    styleUrls: ['./movies-index-list.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, LoaderComponent, RouterLink]
})
export class MoviesIndexListComponent {
  @Input() movies: MovieDto[] = [];
  @Input() imagesLoaded: boolean[] = [];
  @Input() loading: boolean = false;

  imagesPath: string = environment.imagesPath;


}
