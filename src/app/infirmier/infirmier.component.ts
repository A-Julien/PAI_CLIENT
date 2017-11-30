import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {InfirmierInterface} from '../dataInterfaces/nurse';
import {PatientInterface} from "../dataInterfaces/patient";

@Component({
  selector: 'app-infirmier',
  templateUrl: './infirmier.component.html',
  styleUrls: ['./infirmier.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class InfirmierComponent implements OnInit {
  @Input("data") infirmier: InfirmierInterface;

  constructor() { }

  ngOnInit() {
  }

  getNom():string{
    return this.infirmier.nom.toString();
  }

  getPrenom():string{
    return this.infirmier.prénom.toString();
  }

  getPatients():PatientInterface[]{
    return this.infirmier.patients;
  }
}
