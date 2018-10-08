import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatSidenavModule, MatToolbarModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatSnackBarModule, MatProgressSpinnerModule
} from "@angular/material";
import { SharedModule } from "../shared/shared.module";

import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { CharacterComponent } from './containers/character/character.component';
import { EditComponent } from './containers/edit/edit.component';

import { IndexComponent } from './containers/index/index.component';

import { HeroesRoutingModule } from "./heroes-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    HeroesRoutingModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [IndexComponent, CharacterComponent, HeroesComponent, HeroDetailComponent, EditComponent, EditHeroComponent]
})
export class HeroesModule {
}
