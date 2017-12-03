import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PatientInterface } from '../dataInterfaces/patient';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PatientComponent implements OnInit {
  @Input("data") patient: PatientInterface;

  constructor() {

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
}
