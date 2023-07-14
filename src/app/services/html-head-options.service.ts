import {Inject, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class HtmlHeadOptionsService {
  private link?: HTMLLinkElement;

  constructor(@Inject(DOCUMENT) private doc: Document) {
  }

  setCanonical(pathUri?: string) {
    if (!this.link) {
      this.link = this.doc.createElement('link');
      this.link.rel = 'canonical';
      this.doc.head.appendChild(this.link);
    }

    this.link.href = environment.domain;

    if (pathUri) {
      this.link.href += pathUri;
    }


  }
}
