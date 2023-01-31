import { Component } from '@angular/core';
import {Movie} from "../../../interfaces/movies/Movie";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {


  constructor(private titleS: Title) {
    this.titleS.setTitle('Дорамы, кино и сериалы. Смотреть онлайн')
  }

  trendMovies: Movie[] = [];

}
