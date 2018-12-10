import { Injectable } from '@angular/core';

import chileanRut from 'chilean-rut'

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor() {
    
  }

  validaRut(strRut:string){
    let strUnFormatRut : string = chileanRut.unformat(strRut);
    return chileanRut.validate(strUnFormatRut);
  }

  formatRut(strRut:string){
    let ent: string =strRut.substr(0,strRut.length-1); 
    let dv: string = strRut.substr(strRut.length -1,1);
    let strRutForm = chileanRut.format(ent) + '-' + dv

    return strRutForm;
  }

  unFormatRut(strRut:string){
    return chileanRut.unformat(strRut);
  }
}
