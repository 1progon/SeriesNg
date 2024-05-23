import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContainerComponent } from '../../../../../components/container/container.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
    imports: [ContainerComponent, RouterLink]
})
export class FooterComponent {

  year: number = new Date().getFullYear();

  scrollToTop() {
    document.body.scrollIntoView();
  }
}
