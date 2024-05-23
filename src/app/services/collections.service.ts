import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Collection} from "../interfaces/movies/Collection";

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {


  defaultLimit = 28;

  controller: string = 'Collections';
  api: string = environment.apiUrl + this.controller;

  constructor(private http: HttpClient) {
  }

  getCollection(slug: string, offset = 0, limit = this.defaultLimit) {
    let params = new HttpParams();

    if (limit != this.defaultLimit) {
      params = params.append('limit', limit);
    }

    if (offset != 0) {
      params = params.append('offset', offset);
    }

    return this.http.get<Collection>(this.api + '/' + slug, {params});
  }

  getCollections() {
    return this.http.get<Collection[]>(this.api)
  }
}
