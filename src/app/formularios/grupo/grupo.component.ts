//General
import { Component, Input, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';

//Bootstrap
import { NgbModalConfig, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { template } from '../../../../node_modules/@angular/core/src/render3';

//Servicios de funciones
import { GlobalsService } from '../../functiones/globals.service';

//Route
import { Router } from '../../../../node_modules/@angular/router';


//Servicio de Grupo JsonPantalla
import { JsonPantallaGrupoService } from '../../functiones/json-pantalla-grupo.service';

//Http Cliente para consumo de los Apis
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  providers: [NgbModalConfig, NgbModal, GlobalsService, JsonPantallaGrupoService]
})

export class GrupoComponent implements OnInit {

  //Template PopUp Rut Cliente
  @ViewChild('templaterutcliente') templaterutCliente: TemplateRef<any>;
  //Template PopUp Empresa confirmada (con y sin error)
  @ViewChild('empresaconfirmada') empresaconfirmada: TemplateRef<any>;


  closeResult: string;

  //Datos de la Empresa
  RutCliente: string = "";
  NombreEmpresa: string = "";
  SegmentoRiesgoCliente: string = "";
  TipoCliente: string = "";
  SegmentoEconomico: string = "";

  //Ventanas Popup
  VentanaRut: any;
  VentanaSafe: any;

  //Resultado de Consulta Safe
  consultaSafe: boolean = false;

  //Marca para agregar un socio
  AgregaSocio: boolean = false;
  AgregaSocioEmpresa: string = "";
  AgregaAval: boolean = false;
  AgregaDireccion: boolean = false;

  //Marca para agregar empresas relacionadas
  AgregaRelacionado: boolean = false;

  //Tablon de Parametros
  Tipos_Clientes: any = [];

  JsonPantallaServices: JsonPantallaGrupoService = new JsonPantallaGrupoService();

  /**
   * Json de toda la pantalla
   * El objetivo es tener un solo origen de datos para toda la pantalla, la cual servirá de JsonPantalla en base de datos
   * para la consulta de edición
   * Ver como sincronizar los ID al momento de insertar (inicialmente) o insertar al momento de la edicion
  */
  /*
   JsonPantalla: any = {
     "NumeroSolicitud":"",
     "Estado":"",
     "RutCliente":"",
     "RazonSocial":"",
     "SegmentoRiesgo":"",
     "Relacionados":[
           {
             "Id_Empresa":"",
             "Seleccion":"",
             "Estado":"",
             "RutEmpresa":"",
             "TipoRelacion":"",
             "RazonSocialEmpresa":"",
             "PorcentajeParticipacion":"",
             "Socios":[
               {
                 "Id_Socio":"",
                 "Seleccion":"",
                 "Estado":"",
                 "RutSocio":"",
                 "NombreSocio":""
               }
             ]
           }
         ],
     "Avales":[
       {
         "Id_Aval":"",
         "Estado":"",
         "RutSolicitante":"",
         "NombreSolicitante":"",
         "RutAval":"",
         "NombreAval":"",
         "RelacionSolicitante":""
       }
     ]
   } ;
   */

  MuestraJson(txtJson) {
    console.log(JSON.stringify(this.JsonPantallaServices.JsonPantalla[0]));
    txtJson.value = JSON.stringify(this.JsonPantallaServices.JsonPantalla[0]);
  }

  constructor(public http: HttpClient, private router: Router, private globals: GlobalsService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngAfterViewInit() {
    //Aca cargar los datos de Tablon de parametros para el tipo de cliente
    //DUMMY
    this.Tipos_Clientes.push({ "value": "1", "textview": "Pymne" });
    this.Tipos_Clientes.push({ "value": "2", "textview": "EEMM" });
    this.Tipos_Clientes.push({ "value": "3", "textview": "otro" });

    //Verificar si es una nueva solicitud o es una solicitud previamente creada
    //Solicitud Nueva DUMMY
    setTimeout(() => this.openPopup());
  }

  //popup Rut Cliente
  openPopup() {
    this.VentanaRut = this.modalService.open(this.templaterutCliente);
    this.VentanaRut.result.then((result) => {
      if (result != 'Cancelar') {
        if (!this.globals.validaRut(this.RutCliente)) {
          alert("Rut invalido");
          this.openPopup();
          return;
        }
        this.RutCliente = this.globals.formatRut(this.RutCliente);
        this.ConsultaCliente();
      }
    }, (reason) => {
      this.router.navigate(['/bienvenida']);
    });
  }
  //Cierre de Popup Rut Cliente
  cerrarTemplaterutCliente() {
    this.router.navigate(['/bienvenida']);
    this.VentanaRut.close('Cancelar');
  }

  //Consulta servicio de clientes CORE
  ConsultaCliente() {
    //Llamada a Consulta clientes CORE
    //LLAMADA DUMMY
    //let params = {"Rut":"139261313"};
    let params = "";
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    this.http.get("http://192.168.8.102:8080/api/Parametros/0/0/2", {headers: headers}).subscribe(result =>
      {
        console.log(result);
        alert("OK");
      }
    );
    //LLAMADA DUMMY

    //DATOS DUMMY...!!!!!
    this.NombreEmpresa = "Nombre Empresa de Pruebas";
    this.SegmentoEconomico = "Valor Segmento Economico";
    //DATOS DUMMY...!!!!!

    this.ConsultaMallaSocietaria()
  }

  //Popup Consulta servicio de Safe
  ConsultaMallaSocietaria() {
    //Llamada a Safe para obtener Malla Societaria
    //LLAMADA PENDIENTE..!!!!!!
    this.consultaSafe = true;
    //DUMMY DE DATOS DE SAFE...!!!
    this.NombreEmpresa = "Nombre Empresa de Pruebas";
    //Aca se deben cargar los socios y empresas de la malla societaria
    //DUMMY DE DATOS DE SAFE...!!!
    this.VentanaSafe = this.modalService.open(this.empresaconfirmada);

    this.VentanaSafe.result.then((result) => {

    }, (reason) => {
      this.router.navigate(['/bienvenida']);
    });

  }
  //Popup Consulta servicio de Safe
  cerrarTemplateSafe() {
    this.router.navigate(['/bienvenida']);
    this.VentanaSafe.close('Cancelar');
  }

  ngOnInit() {

  }

  //OK con las llamadas
  Continuar() {
    this.VentanaSafe.close("Continuar");
    this.JsonPantallaServices.inicializaJson("0", "I", this.RutCliente, this.NombreEmpresa, this.SegmentoRiesgoCliente, this.TipoCliente, this.SegmentoEconomico);
    alert(this.JsonPantallaServices.JsonPantalla);
  }

  addSocioPrincipal() {
    this.AgregaSocio = true;
  }

  addSocioPrincipalConfirma(RutSocio, NombreSocio, Porcentaje) {
    if (!this.globals.validaRut(RutSocio.value)) {
      RutSocio.value = this.globals.formatRut(RutSocio.value);
      alert("Rut invalido");
      return;
    }
    RutSocio.value = this.globals.formatRut(RutSocio.value);
    this.JsonPantallaServices.AgregarSociosPrincipal(this.RutCliente, false, "0", "I", RutSocio.value, NombreSocio.value, Porcentaje.value);
    this.AgregaSocio = false;
  }

  delSocioPrincipal(Socio) {
    this.JsonPantallaServices.EliminarSocioPrincipal(Socio);
  }

  addSocioPrincipalCancela() {
    this.AgregaSocio = false;
  }

  addSocioRelacionado(RutEmpresa) {
    this.AgregaSocioEmpresa = RutEmpresa;
  }

  addSocioRelacionadoConfirma(Rut_Empresa, RutSocio, NombreSocio, Porcentaje) {
    if (!this.globals.validaRut(RutSocio.value)) {
      RutSocio.value = this.globals.formatRut(RutSocio.value);
      alert("Rut invalido");
      return;
    }
    RutSocio.value = this.globals.formatRut(RutSocio.value);
    this.JsonPantallaServices.AgregarSociosRelacionado(Rut_Empresa, false, "0", "I", RutSocio.value, NombreSocio.value, Porcentaje.value);
    this.AgregaSocioEmpresa = "";
  }

  addSocioRelacionadoCancela() {
    this.AgregaSocioEmpresa = "";
  }

  delSocioRelacionado(RutEmpresa, Socio) {
    this.JsonPantallaServices.EliminarSocioRelacionado(RutEmpresa, Socio);
  }

  addEmpresaRelacionado() {
    this.AgregaRelacionado = true;
  }

  addEmpresaRelacionadoConfirma(RutEmpresa, NombreEmpresa, Porcentaje) {
    if (!this.globals.validaRut(RutEmpresa.value)) {
      alert("Rut invalido");
      return;
    }
    RutEmpresa.value = this.globals.formatRut(RutEmpresa.value);
    this.JsonPantallaServices.AgregarEmpresaRelacionado("0", "0", "I", RutEmpresa.value, "R", NombreEmpresa.value, Porcentaje.value);
    this.AgregaRelacionado = false;
  }

  delEmpresaRelacionado(Empresa) {
    this.JsonPantallaServices.EliminarEmpresaRelacionado(Empresa);
  }

  addEmpresaRelacionadoCancelar() {
    this.AgregaRelacionado = false;
  }


  //AVALES
  addAval() {
    this.AgregaAval = true;
  }

  addAvalCancelar() {
    this.AgregaAval = false;
  }

  addAvalConfirma(NombreSolicitante, RutSolicitante, NombreAval, RutAval, Relacion) {
    if (!this.globals.validaRut(RutAval.value)) {
      RutAval.value = this.globals.formatRut(RutAval.value);
      alert("Rut invalido");
      return;
    }
    RutAval.value = this.globals.formatRut(RutAval.value);
    this.JsonPantallaServices.AgregarAval("0", "false", NombreSolicitante.value, RutSolicitante.value, NombreAval.value, RutAval.value, Relacion.value);
    this.AgregaAval = false;
  }

  delAval(Aval) {
    this.JsonPantallaServices.EliminarAval(Aval);
  }



  //DIRECCIONES
  addDireccion() {
    this.AgregaDireccion = true;
  }

  addDireccionCancelar() {
    this.AgregaDireccion = false;
  }

  addDireccionConfirma(Direccion, Telefono1, Telefono2) {
    this.JsonPantallaServices.AgregarDireccion("0", Direccion, Telefono1, Telefono2);
    this.AgregaDireccion = false;
  }

  delDireccion(Dire) {
    this.JsonPantallaServices.EliminarDireccion(Dire);
  }


  Guardar() {
    //Se toma el JsonPantalla y se envia al API
    //Previo se validan los datos enviados, por lo que se recorre el Json para validar en especial, datos obligatorios y Rut

    let FormValido = true;
    //Valida Socios Empresa Principal
    this.JsonPantallaServices.JsonPantalla[0].EmpresaPrincipal.Socios.forEach(element => {
      if (!this.globals.validaRut(element.RutSocio)) {
        alert("Rut invalido para el socio : " + element.NombreSocio);
        element.Error = true;
        FormValido = false;
      }
      else{
        element.Error = false;
      }
    });

    //Valida Empresas elacionadas
    this.JsonPantallaServices.JsonPantalla[0].Relacionados.forEach(element => {
      if (!this.globals.validaRut(element.RutEmpresa)) {
        alert("Rut invalido para la empresa : " + element.RazonSocialEmpresa);
        element.Error = true;
        FormValido = false;
      }
      else
      {
        element.Error = false;
      }
      

      //Valida Socios de la empresa
      element.Socios.forEach(elementSocio => {
        if (!this.globals.validaRut(elementSocio.RutSocio)) {
          alert("Rut invalido para el socio : " + elementSocio.NombreSocio + ", de la empresa " + element.RazonSocialEmpresa);
          elementSocio.Error = true;
          FormValido = false;
        }
        else
        {
          elementSocio.Error = false;
        }
        
      });
    });
    
    if (!FormValido){
        alert("No Graba");
        return;
    }
    alert("Si Graba");
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  /*
    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
    */
}
