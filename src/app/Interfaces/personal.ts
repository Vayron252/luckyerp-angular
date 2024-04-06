import { TipoDocumento } from "./tipo-documento";

export interface Personal {
    idpersonal:number,
    oTipoDocumento?: TipoDocumento,
    nrodocumento?:string,
    apepaterno?:string,
    apematerno?:string,
    nombre1?:string,
    nombre2?:string,
    nombrecompleto?:string,
    fecnacimiento?:string,
    fecingreso?:string,
    fecregistro?:string,
    usuregistra?:string,
    fecmodifica?:string,
    usumodifica?:string,
    flgactivo?:boolean
}
