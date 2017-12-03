import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {CabinetMedicalModuleService} from './cabinet-medical.service';

import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { PatientComponent } from './patient/patient.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import {DragDropModule} from 'alx-dragdrop';
import { AgmCoreModule } from '@agm/core';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import { NurseListComponent } from './nurse-list/nurse-list.component';
import {MatTabsModule} from '@angular/material/tabs';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';


@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    InfirmierComponent,
    PatientComponent,
    FormulaireComponent,
    NavBarComponent,
    NurseListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatToolbarModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '41px',
      primaryColour: '#ff1771',
      secondaryColour: '#ff1771',
      tertiaryColour: '#ff1771'
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD_w1r_07SqTtAphUmK3igqBLjirGtJF24"
    })
  ],

  entryComponents:[FormulaireComponent],

  providers: [CabinetMedicalModuleService],

  bootstrap: [AppComponent]
})
export class AppModule { }
