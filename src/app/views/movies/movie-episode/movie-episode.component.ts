import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MoviesService} from "../../../services/movies.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-movie-episode',
  templateUrl: './movie-episode.component.html',
  styleUrls: ['./movie-episode.component.scss']
})
export class MovieEpisodeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public service: MoviesService,
              private san: DomSanitizer) {
  }


  videoLink: SafeResourceUrl = this.san.bypassSecurityTrustResourceUrl('');
  playerLoaded: boolean = false;


  updateVideoLink() {
    this.playerLoaded = false;
    if (this.service.activeEpisode?.kodikLink) {
      this.videoLink = this.san.bypassSecurityTrustResourceUrl(this.service.activeEpisode.kodikLink);
    }


  }

  ngOnInit(): void {

    this.service.activeMovieVideo.subscribe({
      next: (v) => {
        this.updateVideoLink();
      }
    })

    this.route.params.subscribe({
      next: () => {
        this.updateVideoLink();
      }
    })


  }


}
