export class Seccion {
    var: Date = new Date();

    _id:string;
    secNom:string;
    secDes:string;
    colCod:string;
    estCod:string;   
    timestamp:Date;

}


export class ListaSeccion{
    ListSeccionId:number;
    ListSeccionNom:string;
}

export class GetSeccion{
 
   
            estCod: {
                _id: string,
                estCod: string,
                estNom: string,
                estDes: string,
                timestamp: string,
                __v: number
            }
            _id: string;
            secNom: string;
            secDes: string;
            colCod: {
                estCod: string,
                _id: string,
                colNom: string,
                colRuc: string,
                timestamp: string,
                __v: number
            }
            timestamp: string;
            __v: number;
}

export class GetSeccionFiltro{
 
   
    estCod: {
        _id: string,
        estCod: string,
        estNom: string,
        estDes: string,
        timestamp: string,
        __v: number
    }
    _id: string;
    secNom: string;
    secDes: string;
    colCod: {
        estCod: string,
        _id: string,
        colNom: string,
        colRuc: string,
        timestamp: string,
        __v: number
    }
    timestamp: string;
    __v: number;
}