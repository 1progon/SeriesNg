import {Component, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../environments/environment";
import {GenresService} from "../../../services/genres.service";
import {Genre} from "../../../interfaces/movies/Genre";

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

  constructor(private titleS: Title,
              private route: ActivatedRoute,
              private genreS: GenresService) {
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe({
        next: query => {
          // scroll to top
          document.body.scrollIntoView();

          // loaded images to empty
          this.imagesLoaded = [];

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

                // get offset
                let offset = (this.page - 1) * this.limit;

                // get data from service
                this.genreS.getGenre(this.slug, offset)
                  .subscribe({
                    next: data => {
                      this.genre = data;

                      // set meta
                      this.titleS.setTitle('Дорамы в жанре ' + data.name);
                    }
                  })
                  .add(() => this.loading = false)


              }
            })
        }
      })


  }


}
