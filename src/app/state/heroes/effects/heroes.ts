import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { MatDialog } from "@angular/material";
import { map, switchMap, tap, mergeMap } from "rxjs/operators";
import { HeroesService } from "../../../core/services/heroes.service";
import { AddHeroDialogComponent } from "../../../+heroes/components/add-hero-dialog/add-hero-dialog.component";
import { SnackbarOpen } from "../../shared/actions/snackbar";
import {
  LOAD_HERO,
  LOAD_HEROES,
  LoadHeroSuccess,
  LoadHero,
  LoadHeroesSuccess,
  LoadHeroes,
  ADD_HERO_DIALOG_OPEN,
  ADD_HERO_DIALOG_CLOSE,
  AddHeroDialogOpen,
  AddHeroDialogClose,
  DELETE_HERO,
  DeleteHero,
  DeleteHeroSuccess,
  AddHero,
  ADD_HERO,
  AddHeroSuccess,
  ADD_HERO_SUCCESS
} from "../actions/heroes";

@Injectable()
export class HeroesEffects {

  constructor(
    private actions: Actions,
    private HeroesService: HeroesService,
    private matDialog: MatDialog) {}

    
  @Effect()
  addHero: Observable<Action> = this.actions.ofType<AddHero>(ADD_HERO)
    .pipe(
      map(action => action.payload),
      switchMap(hero => this.HeroesService.createHero(hero)),
      map(hero => new AddHeroSuccess(hero)),
    );

  @Effect()
  addHeroSuccess: Observable<Action> = this.actions.ofType<AddHeroSuccess>(ADD_HERO_SUCCESS)
    .pipe(
      mergeMap(() => [
        new SnackbarOpen({
          message: 'Hero Created',
          action: 'Success'
        }),
        new AddHeroDialogClose()
      ])
    );

  @Effect()
  loadHeroes: Observable<Action> = this.actions.ofType<LoadHeroes>(LOAD_HEROES)
    .pipe(
      switchMap(() => this.HeroesService.getHeroes()),
      map(powers => new LoadHeroesSuccess(powers))
    );

  @Effect()
  loadHero: Observable<Action> = this.actions.ofType<LoadHero>(LOAD_HERO)
    .pipe(
      map(action => action.payload),
      switchMap(payload => this.HeroesService.getHero(payload.id)),
      map(power => new LoadHeroSuccess(power))
    );

  @Effect({
    dispatch: false
  })
  addHeroDialogClose: Observable<any> = this.actions.ofType<AddHeroDialogClose>(ADD_HERO_DIALOG_CLOSE)
    .pipe(
      tap(() => this.matDialog.closeAll())
    );

  @Effect({
    dispatch: false
  })
  addHeroDialogOpen: Observable<any> = this.actions.ofType<AddHeroDialogOpen>(ADD_HERO_DIALOG_OPEN)
    .pipe(
      tap(() => this.matDialog.open(AddHeroDialogComponent))
    );

  @Effect()
  deletePower: Observable<Action> = this.actions.ofType<DeleteHero>(DELETE_HERO)
  .pipe(
    map(action => action.payload),
    switchMap(power => this.HeroesService.deleteHero(power)),
    map(power => new DeleteHeroSuccess(power))
  );
    
}