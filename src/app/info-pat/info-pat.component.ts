import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import { CabinetMedicalModuleService } from "../cabinet-medical.service"
import {CabinetInterface} from "../dataInterfaces/cabinet";
import { PatientInterface } from "../dataInterfaces/patient"

@Component({
  selector: 'app-info-pat',
  templateUrl: './info-pat.component.html',
  styleUrls: ['./info-pat.component.css']
})
export class InfoPatComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cab : CabinetMedicalModuleService) {}

  getCoo(){
    let tab : PatientInterface[] = [] ;
    tab.push(this.data);
    this.cab.getLatLngFor(tab);
  }

  getNom():string{
    return this.data.nom.toString();
  }

  getPrenom():string{
    return this.data.prenom;
  }

  getSexe() : string {
    return this.data.sexe == 0 ? "Masculin" : "Feminin";
  }

  getNss() : string {
    return this.data.nss;
  }

  getDate(): string {
    return this.data.date;
  }

  getNum(): string {
    return this.data.adrr.numéro ?  this.data.adrr.num : "";
  }

  getRue(): string {
    return this.data.adrr.rue ? this.data.adrr.rue : "";
  }

  getVille() : string {
    return this.data.adrr.ville;
  }

  getCode() : string {
    return this.data.adrr.codePostal;
  }

  getEtage() : string {
    return this.data.adrr.étage ? this.data.adrr.étage : null;
  }

  ngOnInit() {
  }

}
