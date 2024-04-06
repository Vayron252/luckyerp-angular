import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personal } from '../../../../Interfaces/personal';
import { PersonalService } from '../../../../Services/personal.service';
import { TipoDocumentoService } from '../../../../Services/tipo-documento.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { TipoDocumento } from './../../../../Interfaces/tipo-documento';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATA_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
}

@Component({
  selector: 'app-modal-personal',
  templateUrl: './modal-personal.component.html',
  styleUrl: './modal-personal.component.css',
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATA_FORMATS }]
})
export class ModalPersonalComponent implements OnInit {
  
  formularioPersonal:FormGroup;
  tituloAccion:string = "Agregar";
  botonAccion:string = "Guardar";
  listaTipoDocumentos: TipoDocumento[] = [];

  constructor(
    private modalActual:MatDialogRef<ModalPersonalComponent>,
    @Inject(MAT_DIALOG_DATA) public id:number,
    private fb:FormBuilder,
    private _tDocService:TipoDocumentoService,
    private _persService:PersonalService,
    private _utilService:UtilidadService
  ) {
    this.formularioPersonal = this.fb.group({
      idtipdoc: [0, Validators.required],
      apellidoPaterno: ["", Validators.required],
      apellidoMaterno: ["", Validators.required],
      nombre1: ["", Validators.required],
      nombre2: [""],
      fechaNacimiento: ["", [Validators.required, validadorEspecial.validarFechaNacimiento]],
      nrodocumento: ["", Validators.required]
    });

    if (this.id != 0) {
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
    this._persService.obtenerPersonalPorId(this.id).subscribe({
      next: (data) => {
        if (data.status) {
          this.setearValoresFormulario(data.data);
        }
      },
      error: (e) => {}
    });
  }

  private setearValoresFormulario(datosPersonal:Personal) {
    if (datosPersonal != null) {
      this.formularioPersonal.patchValue({
        idtipdoc: datosPersonal.oTipoDocumento?.idtipodoc,
        apellidoPaterno: datosPersonal.apepaterno,
        apellidoMaterno: datosPersonal.apematerno,
        nombre1: datosPersonal.nombre1,
        nombre2: datosPersonal.nombre2,
        fechaNacimiento: datosPersonal.fecnacimiento,
        nrodocumento: datosPersonal.nrodocumento
      });
    }
  }

  guardarEditar_Personal() {
    const _personal:Personal = {
      idpersonal: this.id,
      apematerno: this.formularioPersonal.value.apellidoMaterno,
      apepaterno: this.formularioPersonal.value.apellidoPaterno,
      nombre1: this.formularioPersonal.value.nombre1,
      nombre2: this.formularioPersonal.value.nombre2,
      fecnacimiento: this.formularioPersonal.value.fechaNacimiento,
      nrodocumento: this.formularioPersonal.value.nrodocumento,
      oTipoDocumento: { idtipodoc: this.formularioPersonal.value.idtipdoc },
      usumodifica:"admin",
      usuregistra: "admin"
    }
    
    this._persService.guardarPersonal(_personal).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilService.mostrarAlerta(`El personal fue ${this.id === 0 ? 'registrado.' : 'actualizado.'}`, "Éxito");
          this.modalActual.close("true");
        } else {
          this._utilService.mostrarAlerta(`No se pudo ${this.id === 0 ? 'registra' : 'actualizar'} el personal.`, "Error");
        }
      },
      error: (e) => { console.log(e); }
    });
  }
}

class validadorEspecial {
  public static validarFechaNacimiento(elemento:FormControl) {
    const anioHoy = new Date().getFullYear();
    if (elemento.value != '') {
      let aux:Date = new Date(elemento.value);
      let anioFecNac = aux.getFullYear();
      if (anioHoy - anioFecNac >= 18) {
        return null;
      } else {
        return { fechainvalida: true };
      }
    } else {
      return null;
    }
  }
}