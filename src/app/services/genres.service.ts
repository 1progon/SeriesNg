import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {GenreDto} from "../dto/movies/GenreDto";
import {GenreShowDto} from "../dto/movies/GenreShowDto";

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private defaultLimit = 28;

  private controller: string = 'Genres';
  private api = environment.apiUrl + this.controller;

  constructor(private http: HttpClient) {
  }

  getGenre(slug: string, offset = 0, limit = this.defaultLimit) {
    let params = new HttpParams();

    if (limit != this.defaultLimit) {
      params = params.append('limit', limit);
    }

    if (offset != 0) {
      params = params.append('offset', offset);
    }

    return this.http.get<GenreShowDto>(this.api + '/' + slug, {params});
  }

  getGenres() {
    return this.http.get<GenreDto[]>(this.api);

  }
}
