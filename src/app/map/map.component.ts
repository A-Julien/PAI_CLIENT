import { Component, OnInit } from '@angular/core';
import { CabinetMedicalModuleService } from "../cabinet-medical.service"
import {InfirmierInterface} from "../dataInterfaces/nurse";
import {PatientInterface} from "../dataInterfaces/patient";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat: number = 51.678418;
  lng: number = 7.809007;
  constructor(private cab : CabinetMedicalModuleService) { }

  ngOnInit() {
  }
  getCabinetLat() : number{
    console.log(this.cab);
    return this.cab.getLat();
  }

  getCabinetLng() : number{
    return this.cab.getLng();//this.cab.getCabinetLng();
  }

  getNurses(): InfirmierInterface[]{
    return this.cab.getInf();
  }

  getPatients_Na() : PatientInterface[]{
    return this.cab.getPatNa();
  }
  getPatients() : PatientInterface[]{
    return this.cab.getPat();
  }
}
