import {sexeEnum} from './sexe';
import {Adresse} from "./adress";

export interface PatientInterface {
 prénom: string;
 nom: string;
 date : string;
 sexe: sexeEnum;
 numéroSécuritéSociale: string;
 adresse: Adresse;
}

