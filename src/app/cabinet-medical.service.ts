import { Injectable } from '@angular/core';
import {promise} from "selenium-webdriver";
import {CabinetInterface} from "./dataInterfaces/cabinet";
import {Http, Response} from '@angular/http';
import {Adresse} from './dataInterfaces/adress';
import {InfirmierInterface} from './dataInterfaces/nurse';
import {PatientInterface} from './dataInterfaces/patient';
import {copyStyles} from "@angular/animations/browser/src/util";

@Injectable()
export class CabinetMedicalModuleService {

  constructor( private http : Http ) { }

  public getHttp() : Http{
    console.log("il ce fais tard");
    return this.http;
  }

  getData( url : string ):Promise <CabinetInterface>{
    return this.http.get(url).toPromise().then((res : Response) =>{
      const parser = new DOMParser();
      const doc = parser.parseFromString(res.text(),"text/xml");

      console.log(doc);

      if(doc){
        const cabinet : CabinetInterface = {
          infirmiers:[],
          patientsNonAffectés:[],
          adresse : this.getAdressFrom(doc.querySelector("cabinet"))
        };

        const infirmiersXML = Array.from(doc.querySelectorAll("infirmiers>infirmier"));
        cabinet.infirmiers = infirmiersXML.map ( infirmiersXML => {
          return{
            id : infirmiersXML.getAttribute("id"),
            prénom : infirmiersXML.querySelector("prénom").textContent,
            nom : infirmiersXML.querySelector("nom").textContent,
            photo : infirmiersXML.querySelector("photo").textContent,
            patients : [],
            adresse : this.getAdressFrom(infirmiersXML.querySelector("adresse"))
          }
        });


        const patientsXML = Array.from(doc.querySelectorAll("patients>patient"));
        cabinet.patientsNonAffectés = patientsXML.map ( patientsXML => {
          return{
            prénom : patientsXML.querySelector("prénom").textContent,
            nom : patientsXML.querySelector("nom").textContent,
            sexe : null,
            numéroSécuritéSociale : patientsXML.querySelector("numéro").textContent,
            adresse : this.getAdressFrom(patientsXML.querySelector("adresse"))
          }
        });


        const affectations : { inf : InfirmierInterface, pat : PatientInterface}[]
         = patientsXML.map(patientsXML => {
          const numSecu = patientsXML.querySelector("numéro").textContent;
          const pat = cabinet.patientsNonAffectés.find(P => P.numéroSécuritéSociale === numSecu );

          const idInf = patientsXML.querySelector("visite").getAttribute("intervenant");
          const inf = cabinet.infirmiers.find(i => i.id === idInf);
          return { inf : inf, pat : pat }
        });



        affectations.forEach( aff => {
          if(aff.inf){
            aff.inf.patients.push(aff.pat);

            let index = cabinet.patientsNonAffectés.indexOf(aff.pat, 0);
            cabinet.patientsNonAffectés.splice(index,1);

          }
        });

        return cabinet;
      }
      return null;
    })
  }


  private getAdressFrom( root : Element ): Adresse {
    let node : Element;
    return{
      ville : (node = root.querySelector("adresse>ville"))?node.textContent:"",
      codePostal : (node = root.querySelector("adresse>codePostal"))?parseInt(node.textContent,10):0,
      rue:(node = root.querySelector("adresse>rue"))?node.textContent : "",
      numéro:(node = root.querySelector("adresse>numéro"))?node.textContent : "",
      étage:(node = root.querySelector("adresse>étage"))?node.textContent : "",
      lat:(node = root.querySelector("adresse>lat"))?parseInt(node.textContent,10):0,
      lng:(node = root.querySelector("adresse>lng"))?parseInt(node.textContent,10):0
      //...
    };
  }


}

