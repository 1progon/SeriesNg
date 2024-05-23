import {Component} from '@angular/core';
import { FooterComponent } from '../include-main-layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../include-main-layout/header/header.component';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: true,
    imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class MainLayoutComponent {

}
