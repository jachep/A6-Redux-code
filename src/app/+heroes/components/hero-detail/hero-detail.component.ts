import { Component, Input } from '@angular/core';

import { CharacterImage } from "../../../core/models/character-image.model";
import { CharacterUrl, DefaultUrl } from "../../../core/models/character-url.model";
import { Power } from "../../../core/models/power.model";
import { Hero } from "../../../core/models/hero.model";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {

  @Input() hero: Hero;

  @Input() powers: Power[];

  constructor() {
  }

  getCharacterUrlByType(type: "detail" | "wiki" | "comiclink"): CharacterUrl {
    if (this.hero.character.urls) {
      return this.hero.character.urls.find(url => url.type === type);
    } else {
      return new DefaultUrl();
    }
  }

  getLandscapeXlargeImage(image: CharacterImage) {
    return `${image.path}/landscape_xlarge.${image.extension}`;
  }

}
