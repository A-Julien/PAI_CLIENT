import { Injectable } from '@angular/core';
import {sexeEnum} from "./dataInterfaces/sexe";
import {CabinetInterface} from "./dataInterfaces/cabinet";
import {Http, Response} from '@angular/http';
import {Adresse} from './dataInterfaces/adress';
import {InfirmierInterface} from './dataInterfaces/nurse';
import {PatientInterface} from './dataInterfaces/patient';
import {Observable} from "rxjs/Observable";

/** GOOGLE MAP**/
import {MapsAPILoader} from "@agm/core";
import {} from '@types/googlemaps';

@Injectable()
export class CabinetMedicalModuleService {

  /** GOOGLE MAP**/
  private Pgapi: Promise<any>; // Indique quand l’API est disponible
  private geocoder: google.maps.Geocoder;
  private cab : CabinetInterface;
  public mapLoader : boolean = false;

  constructor(private http: Http, mapsAPILoader: MapsAPILoader) {
    this.Pgapi = mapsAPILoader.load().then(() => {
      console.log('google script loaded');
      this.geocoder = new google.maps.Geocoder();
    });
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
            sexe : patientsXML.querySelector("sexe").textContent=="M" ? sexeEnum.M : sexeEnum.F,
            date : patientsXML.querySelector("naissance").textContent,
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
        this.cab = cabinet;
        this.setCoordinate();
        return cabinet;
      }
      return null;
    })
  }

  private setCoordinate(){
    let tab : CabinetInterface[] = [] ;
    tab.push(this.cab);
    this.getLatLngFor(tab);
    this.getLatLngFor(this.cab.infirmiers);
    this.getLatLngFor(this.cab.patientsNonAffectés);

    this.cab.infirmiers.forEach( inf => {
      this.getLatLngFor(inf.patients);
    });
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
    };
  }

  public newPatient(patient: PatientInterface) : Observable<Response> {
    return this.http.post("/addPatient", {
      patientName: patient.nom,
      patientForname: patient.prénom,
      patientNumber: patient.numéroSécuritéSociale,
      patientSex: patient.sexe === sexeEnum.M ? "M" : "F",
      patientBirthday: "AAAA-MM-JJ",
      patientFloor: patient.adresse.étage,
      patientStreetNumber: patient.adresse.numéro,
      patientStreet: patient.adresse.rue,
      patientPostalCode: patient.adresse.codePostal,
      patientCity: patient.adresse.ville
    });
  }

  public injectPatient(infirmier: InfirmierInterface, patient : PatientInterface) : Observable<Response>{
    return this.http.post( "/affectation", {
      infirmier: infirmier.id,
      patient: patient.numéroSécuritéSociale
    });
  }

  public deleteAffectPatient(patient : PatientInterface) : Observable<Response> {
    return this.http.post("/affectation", {
      infirmier: "none",
      patient: patient.numéroSécuritéSociale
    });
  }

  /** GOOGLE MAP **/
  private getLatLngFor( adressables : {adresse: Adresse}[] ) {
    adressables = adressables.slice(); // Copie pour éviter problèmes récursions
    this.Pgapi.then( () => {
      if (adressables.length) {
        const itemWithAdress = adressables.pop();
        const A = itemWithAdress.adresse;
        const address = `${A.numéro} ${A.rue}, ${A.codePostal} ${A.ville}`;
        this.geocoder.geocode({address}, (res, status) => {
          // console.log(itemWithAdress, "=>", status, res);
          if (status === google.maps.GeocoderStatus.OK) {
            const place = res[0].geometry.location;
            itemWithAdress.adresse.lat = place.lat();
            itemWithAdress.adresse.lng = place.lng();
          }
          switch (status) {
            case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
              adressables.push(itemWithAdress);
              this.getLatLngFor(adressables);
              break;
            default:
              this.getLatLngFor(adressables);
          }
        });
      }
    });
  }

  /*public getLat() : number {
    return this.cab.adresse.lat;
  }*/

  private getAllPatLinkToInf() : PatientInterface[]{
    let tab : PatientInterface[] = [];
    this.cab.infirmiers.forEach( inf => {
      inf.patients.forEach( pat => {
        tab.push(pat);
      })
    });
    return tab;
  }


  getLat()  {
    return this.cab  ?  this.cab.adresse.lat  :    0;
  }
  getLng()  {
    return this.cab  ?  this.cab.adresse.lng  :    0;
  }

  getInf() : InfirmierInterface[] {
    return this.cab  ?  this.cab.infirmiers  :   [];
  }

  getPatNa() : PatientInterface[]{
    return this.cab  ?  this.cab.patientsNonAffectés  :   [];
  }

  getPat() : PatientInterface[]{

    return this.cab ? this.getAllPatLinkToInf() : [];
  }
}

