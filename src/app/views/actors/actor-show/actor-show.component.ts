import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {ActorsService} from "../../../services/actors.service";
import {Actor} from "../../../interfaces/actors/Actor";
import {Title} from "@angular/platform-browser";
import {HttpErrorResponse, HttpStatusCode} from "@angular/common/http";
import {HtmlHeadOptionsService} from "../../../services/html-head-options.service";
import {ActorShowDto} from "../../../dto/actors/ActorShowDto";

@Component({
  selector: 'app-actor-show',
  templateUrl: './actor-show.component.html',
  styleUrls: ['./actor-show.component.scss']
})
export class ActorShowComponent implements OnInit {


  constructor(private service: ActorsService,
              private route: ActivatedRoute,
              private titleS: Title,
              private router: Router,
              private htmlS: HtmlHeadOptionsService) {
  }

  actor = <ActorShowDto>{
    name: ''
  };
  loading = false;
  crumbs: Breadcrumb[] = [];

  imagesLoaded: boolean[] = [];
  imagesPath = environment.imagesPath;
  page: number = 1;
  limit = 28;

  ngOnInit(): void {


    this.route.queryParams.subscribe({
      next: queries => {
        let page = parseInt(queries['page']);

        this.page = !isNaN(page) ? page : 1;
        let offset = (this.page - 1) * this.limit;


        this.route.params.subscribe({
          next: params => {
            let actorSlug = params['slug'];

            if (actorSlug) {
              this.loading = true;
              this.imagesLoaded = [];

              this.service.getActor(actorSlug,
                offset,
                this.limit)
                .subscribe({
                  next: data => {
                    this.titleS.setTitle('Дорамы с актёром ' + data.name);

                    // set canonical in head
                    let canonical = 'actors/' + actorSlug;
                    if (this.page > 1) {
                      canonical += '?page=' + this.page;
                    }
                    this.htmlS.setCanonical(canonical);

                    this.actor = data;


                    this.crumbs = [
                      {path: '/actors', name: 'Актёры дорам'},
                      {name: 'Дорамы с актёром ' + data.name},
                    ]
                  },
                  error: (err: HttpErrorResponse) => {
                    if (err.status == HttpStatusCode.NotFound) {
                      this.router.navigateByUrl('/404', {replaceUrl: true}).finally();
                    }

                  }
                }).add(() => this.loading = false)
            }


          }
        })
      }
    })


  }
}
