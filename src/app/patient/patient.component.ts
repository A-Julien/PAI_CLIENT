import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PatientInterface } from '../dataInterfaces/patient';
import { InfoPatComponent } from "../info-pat/info-pat.component"
import { MatDialog } from '@angular/material';
import { Adresse } from "../dataInterfaces/adress";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit {
  @Input("data") patient: PatientInterface;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  getNom():string{
    return this.patient.nom.toString();
  }

  getPatient():PatientInterface{
    return this.patient;
  }

  getPrenom():string{
    return this.patient.prénom.toString();
  }

  getNss():string{
    return "nss : " + this.patient.numéroSécuritéSociale;
  }

  getAdrr() : Adresse {
    return this.patient.adresse
  }

  openDialog(): void {
    this.dialog.open(InfoPatComponent, {
      data: {
        nom : this.patient.nom,
        prenom : this.patient.prénom,
        sexe : this.patient.sexe,
        date : this.patient.date,
        nss : this.patient.numéroSécuritéSociale,
        adrr : this.patient.adresse
      }
    });
  }
}
