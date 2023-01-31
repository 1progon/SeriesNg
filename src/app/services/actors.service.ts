import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Actor} from "../interfaces/actors/Actor";

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  constructor(private http: HttpClient) {
  }

  offset = 0;
  limit = 28;

  getActors(offset = 0, limit = 28) {

    let params = new HttpParams();

    if (offset != 0) {
      params = params.append('offset', offset);
    }

    if (limit != 28) {
      params = params.append('limit', limit);
    }

    return this.http.get<Actor[]>(environment.apiUrl + 'actors', {params});

  }

  getActor(slug: string, moviesOffset: number = this.offset,
           moviesLimit: number = this.limit) {

    let params = new HttpParams();

    if (moviesOffset != this.offset) {
      params = params.append('offset', moviesOffset);
    }

    if (moviesLimit != this.limit) {
      params = params.append('limit', moviesLimit);
    }

    return this.http.get<Actor>(environment.apiUrl + 'actors/' + slug,
      {params});
  }
}
