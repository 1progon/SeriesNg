import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./views/layouts/main-layout/main-layout.component";
import {MoviesIndexComponent} from "./views/movies/movies-index/movies-index.component";
import {MovieShowComponent} from "./views/movies/movie-show/movie-show.component";
import {ActorsIndexComponent} from "./views/actors/actors-index/actors-index.component";
import {ActorShowComponent} from "./views/actors/actor-show/actor-show.component";
import {Error404Component} from "./views/errors/error404/error404.component";
import {AccountLayoutComponent} from "./views/layouts/account-layout/account-layout.component";
import {GenreShowComponent} from "./views/genres/genre-show/genre-show.component";
import {CollectionShowComponent} from "./views/collections/collection-show/collection-show.component";
import {MoviesIndexLayoutComponent} from "./views/movies/layout/movies-index-layout/movies-index-layout.component";
import {CollectionsIndexComponent} from "./views/collections/collections-index/collections-index.component";
import {MovieEpisodeComponent} from "./views/movies/movie-episode/movie-episode.component";
import {MovieVideoComponent} from "./views/movies/movie-video/movie-video.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      // homepage
      // {path: '', component: HomepageComponent},
      {path: '', redirectTo: '/movies', pathMatch: 'full'},

      // movies
      {
        path: 'movies', component: MoviesIndexLayoutComponent, children: [
          {path: '', component: MoviesIndexComponent},
          {path: 'new', component: MoviesIndexComponent},
          {path: 'popular', component: MoviesIndexComponent},
          {path: 'soon', component: MoviesIndexComponent},
          {path: 'best', component: MoviesIndexComponent},
          {path: 'choice', component: MoviesIndexComponent},
          {path: 'collections', component: CollectionsIndexComponent},
          {path: 'random', component: MoviesIndexComponent},
        ]
      },

      {
        path: 'movies',
        children: [
          {
            path: ':movieSlug', children: [
              {path: '', component: MovieShowComponent},
              {
                path: 'videos',
                children: [
                  {path: '', component: MovieVideoComponent},
                  {
                    path: 'v/:videoId',
                    component: MovieVideoComponent, children: [
                      {path: '', component: MovieEpisodeComponent}
                    ]
                  },
                  {
                    path: 'v/:videoId/s/:seasonNumber',
                    component: MovieVideoComponent, children: [
                      {path: '', component: MovieEpisodeComponent}
                    ]
                  },
                  {
                    path: 's/:seasonNumber/e/:episodeNumber',
                    component: MovieVideoComponent, children: [
                      {path: '', component: MovieEpisodeComponent}
                    ]
                  },
                  {
                    path: 'v/:videoId/s/:seasonNumber/e/:episodeNumber',
                    component: MovieVideoComponent, children: [
                      {path: '', component: MovieEpisodeComponent}
                    ]
                  },


                ]
              },


            ]
          },

        ]
      },


      // genres
      {path: 'genres/:slug', component: GenreShowComponent},

      // collections
      {path: 'collections/:slug', component: CollectionShowComponent},


      // actors
      {path: 'actors', component: ActorsIndexComponent},
      {path: 'actors/:slug', component: ActorShowComponent},

      // errors
      {path: '404', component: Error404Component},
      {path: '**', redirectTo: '/404'},

    ]
  },

  {
    path: 'account', component: AccountLayoutComponent, children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
