import { Component,ChangeDetectionStrategy } from '@angular/core';
import {CabinetMedicalModuleService} from './cabinet-medical.service'
import {InfirmierInterface} from "./dataInterfaces/nurse";
import {PatientInterface} from "./dataInterfaces/patient";
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = 'app';

  //title: string = 'My first AGM project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  show : boolean = this.cab.mapLoader;

  constructor( private cab :  CabinetMedicalModuleService){}

  getCabinetLat() : number{
    //while (!this.cab.getLat());
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
