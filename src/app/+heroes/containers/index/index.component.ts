import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { Observable } from "rxjs/Observable";
import { Hero } from "../../../core/models/hero.model";
import { AddHeroDialogOpen, DeleteHero, LoadHeroes } from "../../../state/heroes/actions/heroes";
import { getAllHeroes, isHeroLoading, HeroesState } from "../../../state/heroes/reducers";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  
  loading: Observable<boolean>;

  heroes: Observable<Array<Hero>>;

  constructor(
    private store: Store<HeroesState>
  ) {
  }

  ngOnInit() {
    this.loading = this.store.select(isHeroLoading);
    this.heroes = this.store.select(getAllHeroes);
    this.store.dispatch(new LoadHeroes());
  }

  add() {
    this.store.dispatch(new AddHeroDialogOpen());
  }

  delete(hero: Hero) {
    this.store.dispatch(new DeleteHero(hero));
  }

}
