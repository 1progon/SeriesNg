import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Collection} from "../interfaces/movies/Collection";

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  constructor(private http: HttpClient) {
  }

  defaultLimit = 28;

  getCollection(slug: string, offset = 0, limit = this.defaultLimit) {
    let params = new HttpParams();

    if (limit != this.defaultLimit) {
      params = params.append('limit', limit);
    }

    if (offset != 0) {
      params = params.append('offset', offset);
    }

    return this.http.get<Collection>(environment.apiUrl + 'collections/' + slug, {params});
  }

  getCollections() {
    return this.http.get<Collection[]>(environment.apiUrl + 'collections')
  }
}
