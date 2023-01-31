import {Component, Input} from '@angular/core';
import {Params} from "@angular/router";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() page: number = 1;
  @Input() route?: any[];
  @Input() queries?: Params;

}
