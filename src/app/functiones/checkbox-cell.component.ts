import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";

import {ICellEditorAngularComp, ICellRendererAngularComp} from "ag-grid-angular/main";
import { ICellRendererParams } from "ag-grid-community";

@Component({
    selector: 'checkbox-cell',
    template: `<input #InputCheck type="checkbox" [checked]="params.value" (change)="onChange($event)">`
    }) 

export class CheckboxCellComponent implements AfterViewInit, 
ICellRendererAngularComp {
    public params: ICellRendererParams;

    @ViewChild('#InputCheck', {read: ViewContainerRef}) public input;

    agInit(params: ICellRendererParams): void {
        this.params = params;
      }
      
      public onChange(event) {
        this.params.data[this.params.colDef.field] = event.currentTarget.checked;
        }

    refresh(rapams:any) : boolean{
        return true;
    }
    
    ngAfterViewInit() {
    
    }


}