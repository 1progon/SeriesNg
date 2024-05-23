import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-movie-episode-with-season',
    templateUrl: './movie-episode-with-season.component.html',
    styleUrls: ['./movie-episode-with-season.component.scss'],
    standalone: true,
    imports: [ContainerComponent, FormsModule]
})
export class MovieEpisodeWithSeasonComponent {

}
