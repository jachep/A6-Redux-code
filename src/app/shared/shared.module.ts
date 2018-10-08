import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatSidenavModule, MatToolbarModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatProgressBarModule, MatSnackBarModule, MatProgressSpinnerModule
} from "@angular/material";
import { RouterModule } from "@angular/router";
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';

import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { AddPowerDialogComponent } from "./dialogs/add-power-dialog/add-power-dialog.component";
import { AddHeroDialogComponent } from "../+heroes/components/add-hero-dialog/add-hero-dialog.component";

const components = [
  AddPowerDialogComponent,
  AddHeroDialogComponent,
  DialogHeaderComponent,
  LayoutComponent,
  NotFoundComponent
];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
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
    RouterModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    AddPowerDialogComponent,
    AddHeroDialogComponent
  ],
  declarations: [...components],
  exports: [...components]
})
export class SharedModule { }
