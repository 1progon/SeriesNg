import {Component, Input} from '@angular/core';
import { Params, RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink]
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() route?: any[];
  @Input() queries?: Params;

}
