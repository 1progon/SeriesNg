import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-movies-index-layout',
  templateUrl: './movies-index-layout.component.html',
  styleUrls: ['./movies-index-layout.component.scss']
})
export class MoviesIndexLayoutComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  routePath: string = '';
  searchQuery?: string;

  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: query => {
        this.searchQuery = query['search'];

        this.route.url.subscribe({
          next: () => {
            this.routePath = this.route.children[0].routeConfig?.path ?? '';
          }
        })


      }
    })

  }


  searchMovie(input: string) {
    this.router.navigate(['/movies'], {queryParams: {search: input}}).finally();
    return;
  }

  clearInput(e: Event) {
    if ((e.target as HTMLInputElement).value == '') {
      this.router.navigate(['/movies']).finally();
    }
  }
}
