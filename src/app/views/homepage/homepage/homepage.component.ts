import { Component } from '@angular/core';
import {Movie} from "../../../interfaces/movies/Movie";
import {Title} from "@angular/platform-browser";
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RouterLink, NgFor]
})
export class HomepageComponent {


  constructor(private titleS: Title) {
    this.titleS.setTitle('Дорамы, кино и сериалы. Смотреть онлайн')
  }

  trendMovies: Movie[] = [];

}
