import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-account-movie-libraries',
    templateUrl: './account-movie-libraries.component.html',
    styleUrls: ['./account-movie-libraries.component.scss'],
    standalone: true,
    imports: [RouterOutlet]
})
export class AccountMovieLibrariesComponent implements OnInit {


  constructor() {

  }

  ngOnInit(): void {

  }


}
