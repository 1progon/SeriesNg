import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../../services/movies.service";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import {Movie} from "../../../interfaces/movies/Movie";
import {environment} from "../../../../environments/environment";
import { LoaderComponent } from '../../../components/loader/loader.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-account-favorites-movies',
    templateUrl: './account-favorites-movies.component.html',
    styleUrls: ['./account-favorites-movies.component.scss'],
    standalone: true,
    imports: [NgFor, NgIf, LoaderComponent, RouterLink]
})
export class AccountFavoritesMoviesComponent implements OnInit {

  movies: Movie[] = [];
  loading: boolean = false;
  imagesLoaded: boolean[] = [];
  imagesPath: string = environment.imagesPath;

  constructor(private moviesService: MoviesService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.loading = true;
    this.imagesLoaded = [];
    this.moviesService.getUserFavoriteMovies().subscribe({
      next: value => {

        this.movies = value;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);

        if (err.status == HttpStatusCode.Unauthorized) {
          this.router.navigateByUrl('/login').finally();
          return;
        }
      }
    }).add(() => this.loading = false)
  }


  removeMovieFromList(movieId: number) {
    this.loading = true;

    this.moviesService.removeUserFavoriteMovie(movieId)
      .subscribe({
        next: () => {
          this.movies = this.movies.filter(value => value.id != movieId);
        }
      })
      .add(() => this.loading = false)
  }
}
