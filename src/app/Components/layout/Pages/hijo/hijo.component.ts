import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HijoService } from '../../../../Services/hijo.service';
import { UtilidadService } from '../../../../Reutilizable/utilidad.service';
import { Hijo } from '../../../../Interfaces/hijo';
import { MatTableDataSource } from '@angular/material/table';
import { ModalHijoComponent } from '../../Modales/modal-hijo/modal-hijo.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrl: './hijo.component.css'
})
export class HijoComponent implements OnInit {
  
  private idpers:number;
  columnasTabla:string[] = ['idhijo','nombrecompleto','fecnacimiento','editar','eliminar'];
  dataInicio:Hijo[] = [];
  dataListaHijo = new MatTableDataSource(this.dataInicio);

  constructor(
    private route:ActivatedRoute,
    private dialog:MatDialog,
    private _hijoServicio:HijoService,
    private _utilidadServicio:UtilidadService,
    private location: Location
  ) {
    this.idpers = this.route.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.listarHijos();
  }

  goBack() {
    this.location.back();
  }

  listarHijos() {
    this._hijoServicio.listarHijosPorPersonal(this.idpers).subscribe({
      next: (data) => {
        if (data.status) {
          console.log(data.data);
          this.dataListaHijo.data = data.data;
        } 
        else {
          this._utilidadServicio.mostrarAlerta("No se encontraron datos!!", "Oops");
        }
      },
      error:(e) => {}
    });
  }

  aplicarFiltroTabla(event:Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaHijo.filter = filterValue.trim().toLocaleLowerCase();
  }

  nuevoHijo(id:number) {
    this.dialog.open(ModalHijoComponent, {
      disableClose: true,
      data: { idhijo: id, idpersonal: this.idpers }
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") this.listarHijos();
    });
  }

  editarHijo(id:number) {
    this.dialog.open(ModalHijoComponent, {
      disableClose: true,
      data: { idhijo: id, idpersonal: this.idpers }
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") this.listarHijos();
    });
  }

  eliminarHijo(hijo:Hijo) {
    hijo.usumodifica = "admin";
    Swal.fire({
      title: "¿Desea eliminar el personal?",
      text: hijo.nombrecompleto,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._hijoServicio.eliminarHijo(hijo).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("El hijo fue eliminado.", "Listo");
              this.listarHijos();
            }
            else {
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el hijo.", "Error");
            }
          },
          error: (e) => {}
        });
      }
    });
  }
}
