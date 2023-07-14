import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-movies-index-list-head',
  templateUrl: './movies-index-list-head.component.html',
  styleUrls: ['./movies-index-list-head.component.scss']
})
export class MoviesIndexListHeadComponent {
  @Input() title: string = '';

}
