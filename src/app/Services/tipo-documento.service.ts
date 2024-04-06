import { HttpClient } from '@angular/common/http';
import { ResponseApi } from './../Interfaces/response-api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private urlAPI:string = 'https://localhost:7278/api/lucky/';

  constructor(private http:HttpClient) { }

  listarTiposDocumentos():Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlAPI}listarTiposDocumentos`);
  }
}
