import {Component} from "@angular/core";

import {ICellEditorAngularComp} from "ag-grid-angular";
import { isNumber } from "util";

@Component({
    selector: 'numeric-cell',
    template: `{{params.value}}`
})
export class NumberEditorComponent implements ICellEditorAngularComp{
    public params:any;
    
    agInit(params:any):void {
        alert(params.value);
        if (isNumber(params.value)){
            this.params = params;
        }
        else
        {
            //El valor no es numero
            alert("El valor ingresado no es numero");
            params.value = 0;
        }
    }



    getValue(): any {
        return this.params;
    }

    // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
    ngAfterViewInit() {
    }
}