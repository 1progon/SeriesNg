import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../../../components/container/container.component';

@Component({
    selector: 'app-movies-index-layout',
    templateUrl: './movies-index-layout.component.html',
    styleUrls: ['./movies-index-layout.component.scss'],
    standalone: true,
    imports: [ContainerComponent, FormsModule, RouterLink, RouterLinkActive, RouterOutlet]
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
