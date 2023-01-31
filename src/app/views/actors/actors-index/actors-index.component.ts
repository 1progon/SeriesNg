import {Component, OnInit} from '@angular/core';
import {ActorsService} from "../../../services/actors.service";
import {Breadcrumb} from "../../../interfaces/Breadcrumb";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Actor} from "../../../interfaces/actors/Actor";

@Component({
  selector: 'app-actors-index',
  templateUrl: './actors-index.component.html',
  styleUrls: ['./actors-index.component.scss']
})
export class ActorsIndexComponent implements OnInit {


  constructor(private service: ActorsService,
              private route: ActivatedRoute) {
  }

  actors: Actor[] = [];
  loading: boolean = false;
  crumbs: Breadcrumb[] = [
    {name: 'Актёры'}
  ];
  imagesLoaded: boolean[] = [];
  imagesPath: string = environment.imagesPath;

  page = 1;
  limit = 28;


  ngOnInit(): void {
    this.route.queryParams.subscribe({
      next: queries => {
        this.imagesLoaded = [];
        document.body.scrollIntoView();

        let page = parseInt(queries['page']);

        this.page = !isNaN(page) ? page : 1;

        if (this.page > 1) {
          this.crumbs = [
            {path: '/actors', name: 'Актёры'},
            {name: 'Стр.' + this.page},
          ];
        }

        this.service.getActors((this.page - 1) * this.limit, this.limit)
          .subscribe({
            next: data => {

              this.actors = data;

            }
          })

      }

    })


  }


}
