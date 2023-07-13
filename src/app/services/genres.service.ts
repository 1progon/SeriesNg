import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Genre} from "../interfaces/movies/Genre";

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  defaultLimit = 28;

  controller: string = 'Genres';
  api = environment.apiUrl + this.controller;

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

    return this.http.get<Genre>(this.api + '/' + slug, {params});
  }

  getGenres() {
    return this.http.get<Genre[]>(this.api);

  }
}
