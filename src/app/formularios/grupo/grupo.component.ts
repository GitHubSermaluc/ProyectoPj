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

//Componente para campos numericos de la grilla
import { NumericEditorComponent } from 'src/app/functiones/numeric-editor.component';
import { CheckboxCellComponent } from 'src/app/functiones/checkbox-cell.component';
import { NumberEditorComponent } from 'src/app/functiones/number-editor.component';
import { isNumber } from 'util';




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

  //Json que controla toda la pantalla
  JsonPantallaGrupo = {};

  closeResult: string;

  //Datos de la Empresa
  RutCliente: string = "";
  
  //Ventanas Popup
  VentanaRut: any;
  VentanaSafe: any;

  consultaSafe = true;

  //Tablon de Parametros
  Tipos_Clientes: any = [];

  constructor(public http: HttpClient, private router: Router, private globals: GlobalsService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngAfterViewInit() {
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
        this.IniciaPantallaGrupo();
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

  //Consulta API para obtener los datos del cliente, safe, segmento de riesgo, 
  IniciaPantallaGrupo() {

    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    var RutSinFormato = this.globals.unFormatRut(this.RutCliente);

    this.http.get(this.globals.RutaRest + "/Grupo/0/" + RutSinFormato , {headers: headers}).subscribe(result =>
      {
        console.log( this.JsonPantallaGrupo);

        this.JsonPantallaGrupo = result;
        console.log(result);
       
        this.MuestraVentanaSafe();
      }
    );
  }

  //Popup Consulta servicio de Safe
  MuestraVentanaSafe() {
    
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
    let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    
    this.http.get(this.globals.RutaRest + "/Parametros/1/0/1", {headers: headers}).subscribe(result =>
      {
        console.log( this.JsonPantallaGrupo);
        this.Tipos_Clientes = result;
        console.log(result);
      }
    );


    
  }
/*
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

   MuestraJson(txtJson) {
    console.log(this.JsonPantallaGrupo);
    txtJson.value = JSON.stringify(this.JsonPantallaGrupo);
  }

  public onChangeGrid(event) {
    console.log(event);
    //params.data[params.colDef.field] = event.currentTarget.checked;
  }

  ColumnsSociosPrincipal = [
    { headerName: 'NumeroSolicitud', field: 'NumeroSolicitud', hide: true},
    { headerName: 'RelacionadoId', field: 'RelacionadoId', hide: true},
    { headerName: 'Seleccionar', field: 'Participacion', width: 80, cellRendererFramework: CheckboxCellComponent },
    { headerName: 'Socio', field: 'Nombre', width: 250 },
    { headerName: 'Rut', field: 'RelacionadoRut' },
    { headerName: 'CodigoTipoRelacion', field: 'CodigoTipoRelacion', hide: true },
    { headerName: 'Porcentaje', field: 'PorcentajeParticipacion', width: 80, editable:true, valueParser: this.ValidaNumero  },
    { headerName: 'RelacionadoIdPadre', field: 'RelacionadoIdPadre', hide: true },
    { headerName: 'CodigoSegmentoNegocio', field: 'CodigoSegmentoNegocio', hide: true },
    { headerName: 'CodigoSegmentoRiesgo', field: 'CodigoSegmentoRiesgo', hide: true },
    { headerName: 'Editando', field: 'Editando', hide: true },
    { headerName: 'Eliminado', field: 'Eliminado', hide: true },
    { headerName: 'Error', field: 'Error', hide: true },
    { headerName: 'Estado', field: 'Estado', hide: true },
    { headerName: 'PersonaPoliticamenteExpuesta', field: 'PersonaPoliticamenteExpuesta', hide: true }
    
  ]

  ValidaNumero(params){
      console.log(params);  
      var Valor = Number(params.newValue).toString();
      if (Valor == 'NaN'){
        params.data[params.colDef.field] = 0;
        alert("El valor ingresado no es un número");
      }
      else
      {
        return Valor;
      }
  }

  /* 

  rowData = [
      {make: 'Toyota', model: 'Celica', price: 35000},
      {make: 'Ford', model: 'Mondeo', price: 32000},
      {make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  AgregarPrueba(Grilla){
    this.rowData.push({make: '', model: '', price: 0});
    Grilla.api.setRowData(this.rowData);
    console.log(this.rowData);
  }
  */
}
