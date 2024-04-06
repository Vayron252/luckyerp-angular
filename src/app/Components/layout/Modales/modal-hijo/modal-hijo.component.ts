import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDocumentoService } from '../../../../Services/tipo-documento.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { TipoDocumento } from './../../../../Interfaces/tipo-documento';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { HijoService } from '../../../../Services/hijo.service';
import { Hijo } from '../../../../Interfaces/hijo';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

interface Params {
  idhijo:number,
  idpersonal:number
}

@Component({
  selector: 'app-modal-hijo',
  templateUrl: './modal-hijo.component.html',
  styleUrl: './modal-hijo.component.css',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }]
})
export class ModalHijoComponent implements OnInit {

  formularioHijo:FormGroup;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaTipoDocumentos: TipoDocumento[] = [];

  constructor(
    private modalActual:MatDialogRef<ModalHijoComponent>,
    @Inject(MAT_DIALOG_DATA) private params:Params,
    private fb:FormBuilder,
    private _tDocService:TipoDocumentoService,
    private _hijoService:HijoService,
    private _utilService:UtilidadService
  ) {
    this.formularioHijo = this.fb.group({
      idtipdoc: [0, Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      nombre1: ["", Validators.required],
      nombre2: [""],
      fechaNacimiento: ["", Validators.required],
      nrodocumento: ["", Validators.required]
    });

    if (this.params.idhijo != 0) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._tDocService.listarTiposDocumentos().subscribe({
      next: (data) => {
        if(data.status) this.listaTipoDocumentos = data.data;
      },
      error:(e) => {}
    });
  }

  ngOnInit(): void {
    if (this.params.idhijo != 0) {
      this._hijoService.obtenerHijoPorId(this.params.idhijo).subscribe({
        next: (data) => {
          if (data.status) {
            this.setearValoresFormulario(data.data);
          }
        },
        error: (e) => {}
      });
    }
  }

  private setearValoresFormulario(datosHijo:Hijo) {
    if (datosHijo != null) {
      this.formularioHijo.patchValue({
        idtipdoc: datosHijo.oTipoDocumento.idtipodoc,
        apellidoPaterno: datosHijo.apepaterno,
        apellidoMaterno: datosHijo.apematerno,
        nombre1: datosHijo.nombre1,
        nombre2: datosHijo.nombre2,
        fechaNacimiento: datosHijo.fecnacimiento,
        nrodocumento: datosHijo.nrodocumento
      });
    }
  }

  guardarEditar_Hijo() {
    const _hijo:Hijo = {
      idhijo: this.params.idhijo,
      apematerno: this.formularioHijo.value.apellidoMaterno,
      apepaterno: this.formularioHijo.value.apellidoPaterno,
      nombre1: this.formularioHijo.value.nombre1,
      nombre2: this.formularioHijo.value.nombre2,
      fecnacimiento: this.formularioHijo.value.fechaNacimiento,
      nrodocumento: this.formularioHijo.value.nrodocumento,
      fecmodifica:"",
      fecregistro:"",
      flgactivo:true,
      nombrecompleto:"",
      oPersonal: { idpersonal: this.params.idpersonal },
      oTipoDocumento: { idtipodoc: this.formularioHijo.value.idtipdoc },
      usumodifica:"admin",
      usuregistra: "admin"
    }
    console.log(_hijo);
    this._hijoService.guardarHijo(_hijo).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilService.mostrarAlerta(`El hijo fue ${this.params.idhijo === 0 ? 'registrado.' : 'actualizado.'}`, "Éxito");
          this.modalActual.close("true");
        } else {
          this._utilService.mostrarAlerta(`No se pudo ${this.params.idhijo === 0 ? 'registrar' : 'actualizar'} el hijo.`, "Error");
        }
      },
      error: (e) => { console.log(e) }
    });
  }
}
