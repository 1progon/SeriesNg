import {Component, OnInit} from '@angular/core';
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {ActorsService} from "../../../services/actors.service";
import {Actor} from "../../../interfaces/actors/Actor";

@Component({
  selector: 'app-actor-show',
  templateUrl: './actor-show.component.html',
  styleUrls: ['./actor-show.component.scss']
})
export class ActorShowComponent implements OnInit {


  constructor(private service: ActorsService,
              private route: ActivatedRoute) {
  }

  actor: Actor = <Actor>{};
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
            this.imagesLoaded = [];
            this.loading = true;
            let actorSlug = params['slug'];

            if (actorSlug) {
              this.service.getActor(actorSlug,
                offset,
                this.limit)
                .subscribe({
                  next: data => {
                    this.actor = data;


                    this.crumbs = [
                      {path: '/actors', name: 'Актёры'},
                      {name: 'Актёр ' + data.name},
                    ]
                  }
                }).add(() => this.loading = false)
            }


          }
        })
      }
    })


  }
}
