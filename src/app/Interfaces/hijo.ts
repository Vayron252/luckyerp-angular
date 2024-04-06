import { Personal } from "./personal";
import { TipoDocumento } from "./tipo-documento";

export interface Hijo {
    idhijo:number,
    oPersonal:Personal,
    oTipoDocumento: TipoDocumento,
    nrodocumento:string,
    apepaterno:string,
    apematerno:string,
    nombre1:string,
    nombre2:string,
    nombrecompleto:string,
    fecnacimiento:string,
    fecregistro:string,
    usuregistra:string,
    fecmodifica:string,
    usumodifica:string,
    flgactivo:boolean
}
