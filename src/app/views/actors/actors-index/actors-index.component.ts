import {Component, OnInit} from '@angular/core';
import {ActorsService} from "../../../services/actors.service";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {Actor} from "../../../interfaces/actors/Actor";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {Title} from "@angular/platform-browser";
import { HttpErrorResponse, HttpStatusCode } from "@angular/common/http";
import {RNames} from "../../../enums/RoutesNames";

@Component({
  selector: 'app-actors-index',
  templateUrl: './actors-index.component.html',
  styleUrls: ['./actors-index.component.scss']
})
export class ActorsIndexComponent implements OnInit {


  constructor(private service: ActorsService,
              private route: ActivatedRoute,
              private router: Router,
              private htmlS: HtmlHeadOptionsService,
              private titleS: Title) {
  }

  actors: Actor[] = [];
  loading: boolean = false;
  crumbs: Breadcrumb[] = [
    {name: 'Актёры дорам'}
  ];
  imagesLoaded: boolean[] = [];
  imagesPath: string = environment.imagesPath;

  page = 1;
  limit = 28;

  alphabet = [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ы',
    'э',
    'ю',
    'я',
  ];
  activeLetter?: string;


  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: queries => {
        document.body.scrollIntoView();

        let canonical = 'actors';
        let seoTitle = 'Все актёры дорам';

        let page = parseInt(queries['page']);
        this.page = !isNaN(page) ? page : 1;


        this.imagesLoaded = [];
        this.loading = true;

        this.crumbs = [
          {path: '/' + RNames.actors, name: 'Актёры дорам'}
        ];

        let startsWith = queries['startsWith'] ?? undefined;
        let canonicalQueries: string[] = [];

        if (startsWith) {
          seoTitle += '. На букву "' + startsWith + '"';
          canonicalQueries.push('startsWith=' + startsWith);
          this.crumbs.push({name: 'На букву "' + startsWith + '"'});
        }

        if (this.page > 1) {
          this.crumbs.push({name: 'Стр.' + this.page});
          canonicalQueries.push('page=' + this.page)
          seoTitle += '. Стр. ' + this.page;
        }

        canonical += '?' + canonicalQueries.join('&');

        setTimeout(() => {
          this.htmlS.setCanonical(canonical);
          this.titleS.setTitle(seoTitle);
        }, 0)

        this.service.getActors((this.page - 1) * this.limit, this.limit, startsWith)
          .subscribe({
            next: data => {
              this.actors = data;
            },
            error: (err: HttpErrorResponse) => {
              if (err.status == HttpStatusCode.NotFound) {
                this.router.navigateByUrl('/404', {replaceUrl: true}).finally();
              }
            }
          })
          .add(() => this.loading = false)


      }

    })


  }


}
