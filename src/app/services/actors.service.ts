import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Actor} from "../interfaces/actors/Actor";
import {ActorShowDto} from "../dto/actors/ActorShowDto";

@Injectable({
  providedIn: 'root'
})
export class ActorsService {
  private controller: string = 'Actors';
  private api: string = environment.apiUrl + this.controller;

  private offset = 0;
  private limit = 28;

  constructor(private http: HttpClient) {
  }

  getActors(offset = 0, limit = 28, startsWith?: string) {

    let params = new HttpParams();

    if (offset != 0) {
      params = params.append('offset', offset);
    }

    if (limit != 28) {
      params = params.append('limit', limit);
    }

    if (startsWith) {
      params = params.append('startsWith', startsWith);
    }

    return this.http.get<Actor[]>(this.api, {params});

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

    return this.http.get<ActorShowDto>(this.api + '/' + slug, {params});
  }
}
