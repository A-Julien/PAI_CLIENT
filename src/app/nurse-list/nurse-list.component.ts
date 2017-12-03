import { Component, OnInit } from '@angular/core';
import {SecretaryComponent} from "../secretary/secretary.component"
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/nurse";

@Component({
  selector: 'app-nurse-list',
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css']
})
export class NurseListComponent implements OnInit {



  constructor(public Sec : SecretaryComponent) { }

  getInfirmiers(): InfirmierInterface[] {
    return this.Sec.getInfirmiers();
  }

  desaffectPatient (pat : PatientInterface){
    console.log("coucou");
    this.Sec.desaffectPatient(pat);
  }

  getPatientsNonAffectes() : PatientInterface[]{
    return this.Sec.getPatientsNonAffectes();
  }

  ngOnInit() {
  }

}
