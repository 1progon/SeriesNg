import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MainLayoutComponent} from './views/layouts/main/main-layout/main-layout.component';
import {AccountLayoutComponent} from './views/layouts/account/account-layout/account-layout.component';
import {AdminLayoutComponent} from './views/layouts/admin/admin-layout/admin-layout.component';
import {HomepageComponent} from './views/homepage/homepage/homepage.component';
import {MoviesIndexComponent} from './views/movies/movies-index/movies-index.component';
import {
  MovieEpisodeWithSeasonComponent
} from './views/movies/movie-episode-with-season/movie-episode-with-season.component';
import {ActorsIndexComponent} from './views/actors/actors-index/actors-index.component';
import {ActorShowComponent} from './views/actors/actor-show/actor-show.component';
import {Error404Component} from './views/errors/error404/error404.component';
import {HeaderComponent} from './views/layouts/main/include-main-layout/header/header.component';
import {FooterComponent} from './views/layouts/main/include-main-layout/footer/footer.component';
import {MoviesIndexSidebarComponent} from './views/movies/include/movies-index-sidebar/movies-index-sidebar.component';
import {MovieShowRelatedComponent} from './views/movies/include/movie-show-related/movie-show-related.component';
import {GenreShowComponent} from './views/genres/genre-show/genre-show.component';
import {LoaderComponent} from './components/loader/loader.component';
import {BreadcrumbComponent} from './components/breadcrumb/breadcrumb.component';
import {CollectionShowComponent} from './views/collections/collection-show/collection-show.component';
import {PaginationComponent} from './components/pagination/pagination.component';
import {MovieShowComponent} from "./views/movies/movie-show/movie-show.component";
import {MovieEpisodeComponent} from "./views/movies/movie-episode/movie-episode.component";
import {MovieVideoComponent} from "./views/movies/movie-video/movie-video.component";
import {MoviesIndexLayoutComponent} from './views/movies/layout/movies-index-layout/movies-index-layout.component';
import {ContainerComponent} from './components/container/container.component';
import {CollectionsIndexComponent} from './views/collections/collections-index/collections-index.component';
import {LoginComponent} from './views/auth/login/login.component';
import {RegisterComponent} from './views/auth/register/register.component';
import {DashboardComponent} from './views/account/dashboard/dashboard.component';
import {EditAccountComponent} from './views/account/edit-account/edit-account.component';
import {
  AccountFavoritesMoviesComponent
} from './views/account/account-favorites-movies/account-favorites-movies.component';
import {AccountWishWatchComponent} from './views/account/account-wish-watch/account-wish-watch.component';
import {AccountWatchingComponent} from './views/account/account-watching/account-watching.component';
import {AccountWatchedComponent} from './views/account/account-watched/account-watched.component';
import {
  AccountMovieLibrariesComponent
} from './views/account/account-movie-libraries/account-movie-libraries.component';
import {BtnLoaderComponent} from './components/btn-loader/btn-loader.component';
import {LoginWithSocialsComponent} from './views/auth/login-with-socials/login-with-socials.component';
import {ForgotPasswordComponent} from './views/auth/forgot-password/forgot-password.component';
import {ToastsComponent} from './components/toasts/toasts.component';
import {ErrorUnauthenticatedComponent} from "./views/errors/error-unauthentificated/error-unauthenticated.component";
import {ErrorUnauthorizedComponent} from './views/errors/error-unauthorized/error-unauthorized.component';
import {GenresIndexComponent} from './views/genres/genres-index/genres-index.component';
import { MoviesIndexListComponent } from './views/movies/include/movies-index-list/movies-index-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AccountLayoutComponent,
    AdminLayoutComponent,
    HomepageComponent,
    MovieShowComponent,
    MoviesIndexComponent,
    MovieEpisodeComponent,
    MovieEpisodeWithSeasonComponent,
    ActorsIndexComponent,
    ActorShowComponent,
    Error404Component,
    HeaderComponent,
    FooterComponent,
    MoviesIndexSidebarComponent,
    MovieShowRelatedComponent,
    GenreShowComponent,
    LoaderComponent,
    BreadcrumbComponent,
    CollectionShowComponent,
    PaginationComponent,
    MovieVideoComponent,
    MoviesIndexLayoutComponent,
    ContainerComponent,
    CollectionsIndexComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EditAccountComponent,
    AccountFavoritesMoviesComponent,
    AccountWishWatchComponent,
    AccountWatchingComponent,
    AccountWatchedComponent,
    AccountMovieLibrariesComponent,
    ErrorUnauthenticatedComponent,
    BtnLoaderComponent,
    LoginWithSocialsComponent,
    ForgotPasswordComponent,
    ToastsComponent,
    ErrorUnauthorizedComponent,
    GenresIndexComponent,
    MoviesIndexListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
