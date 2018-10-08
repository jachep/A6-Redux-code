import { Component, HostListener, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material";
import "rxjs/add/observable/of";

// NGrX Store
import { Store } from "@ngrx/store";
import { LoadPowers } from "../../../state/powers/actions/powers";
import { getAllPowers, isPowerLoading, PowersState } from "../../../state/powers/reducers";
import { AddHero, AddHeroDialogClose } from "../../../state/heroes/actions/heroes";
import { HeroesState } from "../../../state/heroes/reducers/index";

import { Observable, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from "rxjs/operators";
import { Character, generateCharacter } from "../../../core/models/character.model";
import { Hero } from "../../../core/models/hero.model";
import { Power } from "../../../core/models/power.model";
import { CharactersService } from "../../../core/services/characters.service";

@Component({
  templateUrl: "./add-hero-dialog.component.html",
  styleUrls: ["./add-hero-dialog.component.scss"]
})
export class AddHeroDialogComponent implements OnInit {
  filteredCharacters: Observable<Array<Character>>;

  form: FormGroup;

  selectedPowers: Power[] = [];
  selectPowers = new BehaviorSubject<Power[]>([]);

  private character: Character;
  powers: Observable<Array<Power>>;

  constructor(
    private charactersService: CharactersService,
    private formBuilder: FormBuilder,
    private HeroStore: Store<HeroesState>,
    private PowerStore: Store<PowersState>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group( {
      name: ['', Validators.required]
    });

    this.powers = this.PowerStore.select(getAllPowers);
    this.PowerStore.dispatch(new LoadPowers());

    this.filteredCharacters = this.form
      .get("name")
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(value => this.filter(value))
      );
  }

  characterSelected(event: MatAutocompleteSelectedEvent) {
    this.character = <Character>event.option.value;
    this.form.controls.name.setValue(event.option.value.name);
  }

  close() {
    this.HeroStore.dispatch(new AddHeroDialogClose());
  }

  filter(name: string): Observable<Array<Character>> {
    if (name.length === 0) {
      return Observable.of([]);
    }
    return this.charactersService
      .getCharacters(name)
      .pipe(
        filter(marvelResponse => marvelResponse.code === 200),
        map(marvelResponse => marvelResponse.data.results)
      );
  }

  @HostListener("keydown.esc")
  onEsc() {
    this.close();
  }

  save() {
    if (!this.form.valid) {
      return;
    }
    
    const hero = {} as Hero;

    if (this.character) {
      hero.character = this.character;
    } else {
      hero.character = generateCharacter();
      hero.character.name = this.form.controls.name.value;
    }
    hero.powers = this.selectPowers.getValue().map(power => power.id);
 
    this.HeroStore.dispatch(new AddHero(hero));
  }


  togglePower(power: Power) {
    let i = this.selectPowers.getValue().indexOf(power);
    if (i > -1) {
      let arr = [...this.selectPowers.getValue()];
      arr.splice(i, 1);
      this.selectPowers.next(arr);
    } else {
      let arr = this.selectPowers.getValue().concat(power)
      this.selectPowers.next(arr);
    }
  }
}
