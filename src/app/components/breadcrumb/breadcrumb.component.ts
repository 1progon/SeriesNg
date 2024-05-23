import {Component, Input} from '@angular/core';
import {Breadcrumb} from "../../interfaces/Breadcrumb";
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    standalone: true,
    imports: [RouterLink, NgFor, NgIf]
})
export class BreadcrumbComponent {
  @Input() crumbs?: Breadcrumb[];

}
