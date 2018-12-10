import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//Clase principal para Json Pantalla
export class JsonPantallaGrupoService {
  public JsonPantalla: any = [{
    "NumeroSolicitud":"",
    "Estado":"",
    "RutCliente":"",
    "RazonSocial":"",
    "SegmentoEconomico":"",
    "SegmentoRiesgo" :"",
    "TipoCliente":"",
    "EmpresaPrincipal":{},
    "Relacionados" :[],
    "Avales":[],
    "Direcciones":[]
  }];

  constructor() { 
  }

  //Inicia JSON
  public inicializaJson(NumeroSolicitud: string, Estado: string, RutCliente: string, RazonSocial: string, SegmentoRiesgo: string, TipoCliente:string, SegmentoEconomico:string) {
    //Inicializa el JsonPantalla para Grupo
    this.JsonPantalla[0].NumeroSolicitud = NumeroSolicitud;
    this.JsonPantalla[0].Estado = Estado;
    this.JsonPantalla[0].RutCliente = RutCliente;
    this.JsonPantalla[0].RazonSocial = RazonSocial;
    this.JsonPantalla[0].SegmentoRiesgo = SegmentoRiesgo;
    this.JsonPantalla[0].TipoCliente = TipoCliente;
    this.JsonPantalla[0].SegmentoEconomico = SegmentoEconomico;
    
    this.JsonPantalla[0].EmpresaPrincipal = 
      {
        "Id_Empresa": "0",
        "Seleccion": "0",
        "Estado": Estado,
        "RutEmpresa": RutCliente,
        "TipoRelacion": "P",
        "RazonSocialEmpresa": SegmentoRiesgo,
        "PorcentajeParticipacion": "0",
        "Socios": []
      }
    ;
    this.JsonPantalla[0].Avales = [];
    this.JsonPantalla[0].Direcciones = [];
  }
  
  //Socios Empresa principal
  public AgregarSociosPrincipal(Rut_Empresa, Id_Socio, Seleccion, Estado, RutSocio, NombreSocio, Porcentaje) {
    this.JsonPantalla[0].EmpresaPrincipal.Socios.push(
      {
        "Id_Socio": Id_Socio,
        "Seleccion": Seleccion,
        "Estado": Estado,
        "RutSocio": RutSocio,
        "NombreSocio": NombreSocio,
        "PorcentajeSocio":Porcentaje,
        "Editando": false,
        "Eliminado":"0",
        "Error":false
      }
    );
  }

  EliminarSocioPrincipal(Socio:string){
    var indexDel = this.JsonPantalla[0].EmpresaPrincipal[0].Socios.indexOf(Socio);
    this.JsonPantalla[0].EmpresaPrincipal.Socios[indexDel].Eliminado = '1';
    this.JsonPantalla[0].EmpresaPrincipal.Socios[indexDel].Estado = 'E';
  }


  //Empresas Relacionadas
  public AgregarEmpresaRelacionado(Id_Empresa: string, Seleccion: string, Estado: string, RutEmpresa: string, TipoRelacion: string, RazonSocialEmpresa: string, PorcentajeParticipacion: string) {
    this.JsonPantalla[0].Relacionados.push(
      {
        "Id_Empresa": Id_Empresa,
        "Seleccion": Seleccion,
        "Estado": Estado,
        "RutEmpresa": RutEmpresa,
        "TipoRelacion": TipoRelacion,
        "RazonSocialEmpresa": RazonSocialEmpresa,
        "PorcentajeParticipacion": PorcentajeParticipacion,
        "Eliminado":"0",
        "Error":false,
        "Socios": []
      }
    )
  }

  public EliminarEmpresaRelacionado(Empresa){
    var indexDel = this.JsonPantalla[0].Relacionados.indexOf(Empresa);
    this.JsonPantalla[0].Relacionados[indexDel].Eliminado = '1';
    this.JsonPantalla[0].Relacionados[indexDel].Estado = 'E';
  }
  

  //Socios relacionados
  public AgregarSociosRelacionado(Rut_Empresa, Id_Socio, Seleccion, Estado, RutSocio, NombreSocio, Porcentaje) {
    this.JsonPantalla[0].Relacionados.filter(function (item) {
      return item.RutEmpresa === Rut_Empresa;
    })[0].Socios.push(
      {
        "Id_Socio": Id_Socio,
        "Seleccion": Seleccion,
        "Estado": Estado,
        "RutSocio": RutSocio,
        "NombreSocio": NombreSocio,
        "PorcentajeSocio":Porcentaje,
        "Eliminado":"0",
        "Error":false,
      }
    );
  }

  EliminarSocioRelacionado(Rut_Empresa:string, Socio:string){
    var Empresa = this.JsonPantalla[0].Relacionados.filter(function (item) {
      return item.RutEmpresa === Rut_Empresa;
    })[0];
    var indexDel = Empresa.Socios.indexOf(Socio);
    Empresa.Socios[indexDel].Eliminado = '1';
    Empresa.Socios[indexDel].Estado = 'E';
    
  }

    
  //Avales
  public AgregarAval(Id_Aval:string, Seleccion:string, NombreSolicitante:string ,RutSolicitante:string ,NombreAval:string , RutAval:string , Relacion:string ) {
    this.JsonPantalla[0].Avales.push(
      {
        "Id_Aval":Id_Aval,
        "Seleccion":Seleccion,
        "Estado":"I",
        "NombreSolicitante": NombreSolicitante,
        "RutSolicitante": RutSolicitante,
        "NombreAval": NombreAval,
        "RutAval": RutAval,
        "Relacion": Relacion,
        "Eliminado":"0",
        "Error":false
      }
    )
  }

  EliminarAval(Aval:string){
    var indexDel = this.JsonPantalla[0].Avales.indexOf(Aval);
    this.JsonPantalla[0].Avales[indexDel].Eliminado = '1';
    this.JsonPantalla[0].Avales[indexDel].Estado = 'E';
  }


  //Direcciones
  AgregarDireccion(Id_Direccion, Direccion, Telefono1, Telefono2){
    this.JsonPantalla[0].Direcciones.push(
      {
        "Id_Direccion":Id_Direccion,
        "Estado":"I",
        "Direccion": Direccion,
        "Telefono1": Telefono1,
        "Telefono2": Telefono2,
        "Eliminado":"0"
      }
    )
  }

  EliminarDireccion(Direccion:string){
    var indexDel = this.JsonPantalla[0].Direcciones.indexOf(Direccion);
    this.JsonPantalla[0].Direcciones[indexDel].Eliminado = '1';
    this.JsonPantalla[0].Direcciones[indexDel].Estado = 'E';
  }
}
