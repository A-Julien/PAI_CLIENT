import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";
import {CabinetMedicalModuleService} from './cabinet-medical.service';

import { AppComponent } from './app.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { InfirmierComponent } from './infirmier/infirmier.component';
import { PatientComponent } from './patient/patient.component';
import { FormulaireComponent } from './formulaire/formulaire.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryComponent,
    InfirmierComponent,
    PatientComponent,
    FormulaireComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [CabinetMedicalModuleService],

  bootstrap: [AppComponent]
})
export class AppModule { }
