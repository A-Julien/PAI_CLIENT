import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PatientInterface} from "../dataInterfaces/patient";
import {Adresse} from "../dataInterfaces/adress";
import {sexeEnum} from "../dataInterfaces/sexe";
import {CabinetMedicalModuleService} from "../cabinet-medical.service"
import {SecretaryComponent} from "../secretary/secretary.component"


@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormulaireComponent implements OnInit {

  constructor(private cab : CabinetMedicalModuleService,
              private secretary : SecretaryComponent) { }

   setPatient(nom : string,
             prénom : string,
             sexe : string,
             nss : string,
             ville : string,
             codePostal : string,
             rue : string,
             numéro : string,
             étage : string){


     let adresse  : Adresse = {
      ville: ville,
      codePostal: parseInt(codePostal),
      rue: rue,
      numéro: numéro,
      étage: étage,
      lat: 0,
      lng: 0,
    };

    let sexeE : sexeEnum;

    if(sexe == 'M'){
      sexeE = sexeEnum.M;
    }else{
      sexeE = sexeEnum.F;
    }


    let patient : PatientInterface = {
      nom : nom,
      prénom : prénom,
      sexe: sexeE,
      numéroSécuritéSociale: nss,
      adresse: adresse,
    };

    this.cab.newPatient(patient).subscribe(
      response => {
        this.secretary.addPatient(patient);
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
