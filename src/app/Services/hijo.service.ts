import { HttpClient } from '@angular/common/http';
import { ResponseApi } from './../Interfaces/response-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hijo } from '../Interfaces/hijo';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HijoService {

  private urlAPI:string = `${environment.baseUrl}lucky/`;

  constructor(private http:HttpClient) { }

  listarHijosPorPersonal(idpers:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlAPI}listarHijosPorPersonal?idpers=${idpers}`);
  }

  obtenerHijoPorId(id:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlAPI}obtenerHijoPorId?id=${id}`);
  }

  guardarHijo(request:Hijo):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlAPI}guardarHijo`, request);
  }

  eliminarHijo(request:Hijo):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlAPI}eliminarHijo`, request);
  }
}
