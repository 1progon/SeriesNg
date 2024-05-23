import {Component, OnInit} from '@angular/core';
import {MoviesService} from "../../../services/movies.service";
import { ActivatedRoute, Params, Router, RouterOutlet, RouterLink } from "@angular/router";
import {MovieVideo} from "../../../interfaces/movies/MovieVideo";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {DomSanitizer} from "@angular/platform-browser";
import {GetMovieVideoDto} from "../../../dto/movies/GetMovieVideoDto";
import { HttpErrorResponse } from "@angular/common/http";
import {TranslationType} from "../../../enums/movies/TranslationType";
import { NgFor, NgIf } from '@angular/common';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { ContainerComponent } from '../../../components/container/container.component';

@Component({
    selector: 'app-movie-video',
    templateUrl: './movie-video.component.html',
    styleUrls: ['./movie-video.component.scss'],
    standalone: true,
    imports: [ContainerComponent, BreadcrumbComponent, RouterOutlet, NgFor, RouterLink, NgIf]
})
export class MovieVideoComponent implements OnInit {

  constructor(public service: MoviesService,
              private san: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router) {
  }


  mainVideo: MovieVideo = <MovieVideo>{
    movie: {}
  };
  otherMovieVideos: MovieVideo[] = [];

  crumbs?: Breadcrumb[];

  loading: boolean = false;

  playerLoaded: boolean = false;

  translationTypes : typeof TranslationType = TranslationType;

  updateSeasonAndEpisode(params: Params, data: GetMovieVideoDto) {
    if (params['videoId'] && (!params['seasonNumber'] && !params['episodeNumber'])) {
      this.service.activeSeason = data.video.seasons?.[0];
      this.service.activeEpisode = this.service.activeSeason?.episodes?.[0];

    }

    if (params['seasonNumber'] && params['episodeNumber']) {
      this.service.activeSeason = data.video.seasons
        ?.find(value => value.seasonNumber == params['seasonNumber']);

      this.service.activeEpisode = this.service.activeSeason
        ?.episodes
        .find(value => value.seriesNumber == params['episodeNumber']);

    }

    this.mainVideo = data.video;
    this.service.activeMovieVideo.next(this.mainVideo);


    if (this.otherMovieVideos) {
      this.otherMovieVideos = data.otherMovieVideos;
    }


    // generate breadcrumbs
    this.crumbs = [
      {path: 'movies', name: 'Кино и сериалы, дорамы'},
      {path: 'movies/' + data.video.movie.slug, name: 'Дорама ' + data.video.movie.name},
      {
        path: 'movies/' + data.video.movie.slug + '/videos/v/' + data.video.id,
        name: 'Перевод ' + data.video?.translation.name ?? ''
      }
    ];

    if (this.service.activeSeason) {
      this.crumbs.push(
        {
          name: 'Сезон ' + this.service.activeSeason.seasonNumber,
          path: 'movies/' + data.video.movie.slug + '/videos/v/'
            + data.video.id + '/s/' + this.service.activeSeason.seasonNumber
        }
      )
    }

    if (this.service.activeEpisode) {
      this.crumbs.push(
        {name: 'Эпизод ' + this.service.activeEpisode.seriesNumber}
      )
    }
    // end generate breadcrumbs
  }


  ngOnInit(): void {

    this.route.params.subscribe({
      next: params => {
        this.playerLoaded = false;
        this.loading = true;

        if (this.mainVideo
          && this.mainVideo.id
          && this.mainVideo.id == params['videoId']) {

          this.updateSeasonAndEpisode(params,
            {video: this.mainVideo, otherMovieVideos: this.otherMovieVideos});

          this.loading = false;
          return;

        }


        this.service.getMovieVideo(
          params['movieSlug'],
          params['videoId'])
          .subscribe({
            next: data => {


              if (params['seasonNumber'] && !params['episodeNumber']) {
                this.service.activeSeason = data.video.seasons
                  ?.find(value => value.seasonNumber == params['seasonNumber']);

                this.service.activeEpisode = this.service.activeSeason?.episodes
                    .find(value => value.seriesNumber == 1)
                  ?? this.service.activeSeason?.episodes[0];


                this.router.navigate(['/movies',
                  data.video.movie.slug,
                  'videos',
                  'v', data.video.id,
                  's', this.service.activeSeason?.seasonNumber,
                  'e', this.service.activeEpisode?.seriesNumber]).finally();
                return;

              }


              this.updateSeasonAndEpisode(params, data);


            },
            error: (err: HttpErrorResponse) => {
              console.error(err);
              if (err.status == 404) {
                this.router.navigateByUrl('/404').finally();
              }
            }
          }).add(() => this.loading = false)


      }
    })
  }

  scrollToPlayer(moviesRef: HTMLDivElement) {
    moviesRef.scrollIntoView();

  }


}
