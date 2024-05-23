import {Component} from '@angular/core';
import {Location} from "@angular/common";
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-error404',
    templateUrl: './error404.component.html',
    styleUrls: ['./error404.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RouterLink]
})
export class Error404Component {
  constructor(private location: Location) {
  }

  protected goBack() {
    this.location.back();
  }
}
