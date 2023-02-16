import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainLayoutComponent} from "./views/layouts/main/main-layout/main-layout.component";
import {MoviesIndexComponent} from "./views/movies/movies-index/movies-index.component";
import {MovieShowComponent} from "./views/movies/movie-show/movie-show.component";
import {ActorsIndexComponent} from "./views/actors/actors-index/actors-index.component";
import {ActorShowComponent} from "./views/actors/actor-show/actor-show.component";
import {Error404Component} from "./views/errors/error404/error404.component";
import {AccountLayoutComponent} from "./views/layouts/account/account-layout/account-layout.component";
import {GenreShowComponent} from "./views/genres/genre-show/genre-show.component";
import {CollectionShowComponent} from "./views/collections/collection-show/collection-show.component";
import {MoviesIndexLayoutComponent} from "./views/movies/layout/movies-index-layout/movies-index-layout.component";
import {CollectionsIndexComponent} from "./views/collections/collections-index/collections-index.component";
import {MovieEpisodeComponent} from "./views/movies/movie-episode/movie-episode.component";
import {MovieVideoComponent} from "./views/movies/movie-video/movie-video.component";
import {LoginComponent} from "./views/auth/login/login.component";
import {RegisterComponent} from "./views/auth/register/register.component";
import {DashboardComponent} from "./views/account/dashboard/dashboard.component";
import {AccountGuard} from "./guards/account.guard";
import {EditAccountComponent} from "./views/account/edit-account/edit-account.component";
import {
  AccountFavoritesMoviesComponent
} from "./views/account/account-favorites-movies/account-favorites-movies.component";
import {AccountWishWatchComponent} from "./views/account/account-wish-watch/account-wish-watch.component";
import {AccountWatchingComponent} from "./views/account/account-watching/account-watching.component";
import {AccountWatchedComponent} from "./views/account/account-watched/account-watched.component";
import {
  AccountMovieLibrariesComponent
} from "./views/account/account-movie-libraries/account-movie-libraries.component";
import {ErrorUnauthorizedComponent} from "./views/errors/error-unauthorized/error-unauthorized.component";
import {ForgotPasswordComponent} from "./views/auth/forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: 'account',
    title: 'Аккаунт пользователя',
    canActivate: [AccountGuard],
    component: AccountLayoutComponent,
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', title: 'Аккаунт: Дашборд', component: DashboardComponent},
      {
        path: '',
        component: AccountMovieLibrariesComponent,
        children: [
          {
            path: 'edit', component: EditAccountComponent,
            title: 'Аккаунт: Редактировать профиль',
          },
          {
            path: 'favorites', component: AccountFavoritesMoviesComponent,
            title: 'Аккаунт: Избранные фильмы',
          },
          {
            path: 'wish-watch', component: AccountWishWatchComponent,
            title: 'Аккаунт: Хочу посмотреть',
          },
          {
            path: 'watching', component: AccountWatchingComponent,
            title: 'Аккаунт: Смотрю',
          },
          {
            path: 'watched', component: AccountWatchedComponent,
            title: 'Аккаунт: Просмотрено',
          },
        ]
      },

    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // homepage
      // {path: '', component: HomepageComponent},
      {path: '', redirectTo: '/movies', pathMatch: 'full'},

      // movies fast selectors
      {
        path: 'movies',
        component: MoviesIndexLayoutComponent,
        children: [
          {path: '', title: 'Все дорамы', component: MoviesIndexComponent},
          {path: 'new', title: 'Новинки дорамы', component: MoviesIndexComponent},
          {path: 'popular', title: 'Популярные дорамы', component: MoviesIndexComponent},
          {path: 'soon', title: 'Дорамы Скоро', component: MoviesIndexComponent},
          {path: 'best', title: 'Лучшие дорамы', component: MoviesIndexComponent},
          {path: 'choice', title: 'Дорамы на выбор редактора', component: MoviesIndexComponent},
          {path: 'collections', title: 'Подборки дорам', component: CollectionsIndexComponent},
          {path: 'random', title: 'Выбор случайной дорамы', component: MoviesIndexComponent},
        ]
      },

      // movies
      {
        path: 'movies',
        title: 'Все дорамы',
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
      {path: 'actors', title: 'Все актёры', component: ActorsIndexComponent},
      {path: 'actors/:slug', component: ActorShowComponent},

      // auth
      {path: 'login', title: 'Вход в аккаунт', component: LoginComponent},
      {path: 'register', title: 'Регистрация пользователя', component: RegisterComponent},
      {
        path: 'forgot-password', title: 'Восстановление пароля',
        component: ForgotPasswordComponent
      },


      // errors
      {path: 'unauthorized', title: 'Не авторизован', component: ErrorUnauthorizedComponent},
      {path: '404', title: 'Страница 404', component: Error404Component},
      {path: '**', redirectTo: '/404'},

    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
