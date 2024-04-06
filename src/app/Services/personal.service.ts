import { HttpClient } from '@angular/common/http';
import { ResponseApi } from './../Interfaces/response-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personal } from '../Interfaces/personal';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private urlAPI:string = `${environment.baseUrl}lucky/`;

  constructor(private http:HttpClient) { }

  listadoPersonal():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlAPI}listarPersonal`);
  }

  obtenerPersonalPorId(id:number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlAPI}obtenerPersonalPorId?id=${id}`);
  }

  guardarPersonal(request:Personal):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlAPI}guardarPersonal`, request);
  }

  eliminarPersonal(request:Personal):Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlAPI}eliminarPersonal`, request);
  }
}
