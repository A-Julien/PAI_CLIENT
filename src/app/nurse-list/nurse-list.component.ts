import { Component, OnInit } from '@angular/core';
import {SecretaryComponent} from "../secretary/secretary.component"
import {PatientInterface} from "../dataInterfaces/patient";
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {FormulaireComponent} from "../formulaire/formulaire.component";
import {MatDialog, MatTabChangeEvent} from "@angular/material";
import { CabinetMedicalModuleService } from "../cabinet-medical.service"

@Component({
  selector: 'app-nurse-list',
  templateUrl: './nurse-list.component.html',
  styleUrls: ['./nurse-list.component.css']
})
export class NurseListComponent implements OnInit {


  public loading_add : boolean = false;
  public activeInf : string = "001";
  public nurse


  constructor(public Sec : SecretaryComponent,
              public dialog: MatDialog,
              private cab : CabinetMedicalModuleService) {
  }

  getInfirmiers(): InfirmierInterface[] {
    return this.Sec.getInfirmiers();
  }

  desaffectPatient (pat : PatientInterface){
    this.Sec.desaffectPatient(pat);
  }

  getPatientsNonAffectes() : PatientInterface[]{
    return this.Sec.getPatientsNonAffectes();
  }

  onForm(){
    this.loading_add = true;

    let dialogRef = this.dialog.open(FormulaireComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.cab.newPatient(result).subscribe(
        response => {
          this.Sec.addPatient(result);
          this.loading_add = false;
        }
        ,
        error => {
          console.log("ERR-POST");
        }
      );
    });
  }


  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
      this.activeInf  = tabChangeEvent.tab.textLabel;
  }

  ngOnInit() {
  }

}
