import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import {CabinetMedicalModuleService} from "../cabinet-medical.service"
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {PatientInterface} from "../dataInterfaces/patient";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormulaireComponent} from '../formulaire/formulaire.component'
import {ANIMATION_TYPES} from "ngx-loading"



@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SecretaryComponent implements OnInit {

  public loading = false;

  private cabinet : CabinetInterface = {
    infirmiers : [],
    patientsNonAffectés : [],
    adresse : undefined,

  };

  constructor(private cab : CabinetMedicalModuleService,
              cabinetService : CabinetMedicalModuleService) {
    cabinetService.getData("/data/cabinetInfirmier.xml").then(data => this.cabinet = data);
  }


  getInfirmiers(): InfirmierInterface[] {
    return this.cabinet.infirmiers;
  }

  getPatientsNonAffectes(): PatientInterface[]{
    return this.cabinet.patientsNonAffectés;
  }

  public addPatient(pat : PatientInterface):boolean{
    if(this.cabinet.patientsNonAffectés.find( value => {
      return value.numéroSécuritéSociale == pat.numéroSécuritéSociale;
    })){return false}
    this.cabinet.patientsNonAffectés.push(pat);
    return true;
  }

  public desaffectPatient (pat : PatientInterface){
    console.log(pat);
    this.loading = true;
    this.cab.deleteAffectPatient(pat).subscribe(
      response => {
        this.getInfirmiers().forEach( infirmier => {
          infirmier.patients.splice(infirmier.patients.indexOf(pat, 0), 1);
        });
        this.cabinet.patientsNonAffectés.push(pat);
        this.loading = false;
      }
      ,
      error => {
        console.log("ERR-POST");
      }
    );
  }

  public affectPatient(inf : InfirmierInterface, pat : PatientInterface){
    this.loading = true;
    this.cab.injectPatient(inf, pat).subscribe(
      response => {
        if(this.cabinet.patientsNonAffectés.find( v =>{
          return v.numéroSécuritéSociale == pat.numéroSécuritéSociale;
        })){
          console.log("NON AFFECTER");
          this.cabinet.patientsNonAffectés.splice(this.cabinet.patientsNonAffectés.indexOf(pat, 0),1);
        }

        this.getInfirmiers().forEach(infirmier => {
          console.log(infirmier.patients.indexOf(pat, 0));
          if(infirmier.patients.indexOf(pat, 0) != -1){
            console.log("on splice");
            infirmier.patients.splice(infirmier.patients.indexOf(pat, 0), 1);
          }
        });
        inf.patients.push(pat);
        this.loading = false;
      }
      ,
      error => {
        console.log("ERR-POST");
      }
    );
  }

  ngOnInit() {
  }


}
