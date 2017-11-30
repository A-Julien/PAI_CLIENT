import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CabinetMedicalModuleService} from "../cabinet-medical.service"
import {CabinetInterface} from "../dataInterfaces/cabinet";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {PatientInterface} from "../dataInterfaces/patient";



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

  constructor(cabinetService : CabinetMedicalModuleService) {
    cabinetService.getData("/data/cabinetInfirmier.xml").then(data => this.cabinet = data);
  }

  getInfirmiers(): InfirmierInterface[] {
    return this.cabinet.infirmiers;
  }

  getPatientsNonAffectes(): PatientInterface[]{
    return this.cabinet.patientsNonAffectés;
  }

  public addPatient(pat : PatientInterface):boolean{
    /*
    if(this.cabinet.patientsNonAffectés.indexOf(pat)){
      this.cabinet.patientsNonAffectés.push(pat);
      console.log("addPatieny :");
      console.log( this.cabinet.patientsNonAffectés);
      return true;
    }*/
    this.cabinet.patientsNonAffectés.push(pat);
    //console.log( this.cabinet.patientsNonAffectés);
    return false;
  }

  ngOnInit() {
  }

}
