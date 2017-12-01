import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CabinetMedicalModuleService} from "../cabinet-medical.service"
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {PatientInterface} from "../dataInterfaces/patient";
import {DragDropModule} from "alx-dragdrop";





@Component({
  selector: 'app-secretary',
  templateUrl: './secretary.component.html',
  styleUrls: ['./secretary.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SecretaryComponent implements OnInit {
  private cabinet : CabinetInterface = {
    infirmiers : [],
    patientsNonAffectés : [],
    adresse : undefined,

  };

  constructor(private cab : CabinetMedicalModuleService, cabinetService : CabinetMedicalModuleService) {
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
    this.cab.deleteAffectPatient(pat).subscribe(
      response => {
        this.getInfirmiers().forEach( infirmier => {
          infirmier.patients.splice(infirmier.patients.indexOf(pat, 0), 1);
        });
        this.cabinet.patientsNonAffectés.push(pat);
      }
      ,
      error => {
        console.log("ERR-POST");
      }
    );
  }

  public affectPatient(inf : InfirmierInterface, pat : PatientInterface){
    this.cab.injectPatient(inf, pat).subscribe(
      response => {
        if(this.cabinet.patientsNonAffectés.find( v =>{
          return v.numéroSécuritéSociale == pat.numéroSécuritéSociale;
        })){
          this.cabinet.patientsNonAffectés.splice(this.cabinet.patientsNonAffectés.indexOf(pat, 0),1);
        }
        this.getInfirmiers().find( infirmier => {
          return infirmier.id == inf.id;
        }).patients.push(pat);
      }
      ,
      error => {
        console.log("ERR-POST");
      }
    );
  }

  public changeAffectPatient(pat : PatientInterface, inf : InfirmierInterface){
    this.desaffectPatient(pat);
    this.affectPatient(inf, pat);
  }




  ngOnInit() {
  }

}
