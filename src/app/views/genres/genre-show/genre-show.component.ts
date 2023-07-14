import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {GenresService} from "../../../services/genres.service";
import {Genre} from "../../../interfaces/movies/Genre";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {HttpErrorResponse} from "@angular/common/http";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";

@Component({
  selector: 'app-genre-show',
  templateUrl: './genre-show.component.html',
  styleUrls: ['./genre-show.component.scss']
})
export class GenreShowComponent implements OnInit {
  slug?: string;
  page = 1;
  loading = false;
  genre: Genre = <Genre>{};
  imagesPath: string = environment.imagesPath;
  imagesLoaded: boolean[] = [];
  limit = 28;
  crumbs?: Breadcrumb[];

  constructor(private titleS: Title,
              private route: ActivatedRoute,
              private genreS: GenresService,
              private router: Router,
              private htmlS: HtmlHeadOptionsService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe({
        next: query => {
          // scroll to top
          document.body.scrollIntoView();

          // get page number
          let number = parseInt(query['page']);
          this.page = isNaN(number) ? 1 : number;

          this.route.params
            .subscribe({
              next: params => {

                this.slug = params['slug'];
                if (!this.slug || this.loading) return;

                // start loading
                this.loading = true;

                // loaded images to empty
                this.imagesLoaded = [];

                // get offset
                let offset = (this.page - 1) * this.limit;

                // get data from service
                this.genreS.getGenre(this.slug, offset)
                  .subscribe({
                    next: data => {
                      this.genre = data;

                      // set meta
                      this.titleS.setTitle('Дорамы в жанре ' + data.name);

                      // set canonical in head
                      let canonical = 'genres/' + this.slug;
                      if (this.page > 1) {
                        canonical += '?page=' + this.page;
                      }
                      this.htmlS.setCanonical(canonical);

                      // gen crumbs
                      this.crumbs = [
                        {path: 'genres/', name: 'Жанры дорам'},
                        {path: '', name: 'Жанр дорам ' + this.genre.name},
                      ];

                    },
                    error: (err: HttpErrorResponse) => {
                      if (this.page > 1 && !this.genre.movies) {
                        this.router.navigate(['/', 'genres', this.slug]).finally();
                      }
                      this.genre.movies = [];
                    }
                  })
                  .add(() => this.loading = false)


              }
            })
        }
      })


  }


}
