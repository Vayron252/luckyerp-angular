import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Personal } from '../../../../Interfaces/personal';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalPersonalComponent } from '../../Modales/modal-personal/modal-personal.component';
import { PersonalService } from '../../../../Services/personal.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css'
})
export class PersonalComponent implements OnInit, AfterViewInit {

  columnasTabla:string[] = ['idpersonal','nombrecompleto','oTipoDocumento.abrevtipodoc','nrodocumento','fecnacimiento','fecingreso','editar','eliminar','verhijos'];
  dataInicio:Personal[] = [];
  dataListaPersonal = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla! : MatPaginator;

  constructor(
    private dialog:MatDialog,
    private _personalServicio:PersonalService,
    private _utilidadServicio:UtilidadService
  ) {
    
  }

  obtenerPersonal() {
    this._personalServicio.listadoPersonal().subscribe({
      next: (data) => {
        if (data.status) {
          this.dataListaPersonal.data = data.data;
        } 
        else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos!!", "Oops");
        }
      },
      error:(e) => {}
    });
  }

  ngOnInit(): void {
      this.obtenerPersonal();
  }

  ngAfterViewInit(): void {
      this.dataListaPersonal.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaPersonal.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoPersonal(id:number) {
    this.dialog.open(ModalPersonalComponent, {
      disableClose: true,
      data: id
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") this.obtenerPersonal();
    });
  }

  editarPersonal(id:number) {
    this.dialog.open(ModalPersonalComponent, {
      disableClose: true,
      data: id
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") this.obtenerPersonal();
    });
  }

  eliminarPersonal(personal:Personal) {
    personal.usumodifica = "admin";
    Swal.fire({
      title: "¿Desea eliminar el personal?",
      text: personal.nombrecompleto,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._personalServicio.eliminarPersonal(personal).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("El personal fue eliminado.", "Listo");
              this.obtenerPersonal();
            }
            else {
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el personal.", "Error");
            }
          },
          error: (e) => {}
        });
      }
    });
  }

  verHijos(idpers:number) {
    
  }
}
