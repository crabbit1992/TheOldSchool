export class Grado {

    _id:string;
    graNum:string;
    graDes:string;
    colCod:string;
    estCod:string;   
    timestamp:string;
}

export class ListaGrados{
    ListGradoId:number;
    ListGradoNom:string;
}

export class GetGradoFiltro{
            estCod: {
                _id: string,
                estCod: string,
                estNom: string,
                estDes: string,
                timestamp: string,
                __v: number
            }
            _id: string;
            graNum: string;
            graDes: string;
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
export class GetGrado{
    estCod: {
        _id: string,
        estCod: string,
        estNom: string,
        estDes: string,
        timestamp: string,
        __v: number
    }
    _id: string;
    graNum: string;
    graDes: string;
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