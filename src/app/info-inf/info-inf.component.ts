import { Component, OnInit } from '@angular/core';
import { SecretaryComponent } from "../secretary/secretary.component"
import { InfirmierInterface } from "../dataInterfaces/nurse"
import { NurseListComponent } from "../nurse-list/nurse-list.component"

@Component({
  selector: 'app-info-inf',
  templateUrl: './info-inf.component.html',
  styleUrls: ['./info-inf.component.css']
})
export class InfoInfComponent implements OnInit {

  constructor(private sec : SecretaryComponent,
              private nurse : NurseListComponent) { }

  getCurentInf() : InfirmierInterface {
    return this.sec.getInfirmiers().find(inf => {
      return inf.id == this.nurse.activeInf;
    });
  }

  getImgSource() : string {
    if(this.nurse.activeInf == ""){return "/data/bartprison.gif";}
    return this.getCurentInf() ? "/data/"+this.getCurentInf().photo : "/data/homer1.gif";
  }

  getNum(): string {
    return this.getCurentInf() ?  this.getCurentInf().adresse.numéro : "";
  }

  getRue(): string {
    return this.getCurentInf() ? this.getCurentInf().adresse.rue : "";
  }

  getVille() : string {
    return this.getCurentInf() ? this.getCurentInf().adresse.ville : "";
  }

  getCode() : number {
    return this.getCurentInf() ? this.getCurentInf().adresse.codePostal : 0;
  }

  getEtage() : string {
    return this.getCurentInf() ? this.getCurentInf().adresse.étage : null;
  }

  ngOnInit() {
  }

}
