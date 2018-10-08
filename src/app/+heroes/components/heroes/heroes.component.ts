import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from "../../../core/models/hero.model";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {

  @Input() loading: boolean;

  @Output() delete = new EventEmitter<Hero>();

  @Input() heroes: Hero[];

  constructor() {
  }

}
