import { Component } from '@angular/core';
import { FooterComponent } from '../../main/include-main-layout/footer/footer.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../../../../components/container/container.component';
import { HeaderComponent } from '../../main/include-main-layout/header/header.component';

@Component({
    selector: 'app-account-layout',
    templateUrl: './account-layout.component.html',
    styleUrls: ['./account-layout.component.scss'],
    standalone: true,
    imports: [HeaderComponent, ContainerComponent, RouterLink, RouterLinkActive, RouterOutlet, FooterComponent]
})
export class AccountLayoutComponent {

}
