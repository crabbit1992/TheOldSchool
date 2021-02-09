export class Nivel {
    var: Date = new Date();

    _id:string;
    nivNum:string;
    nivDes:string;
    colCod:string;
    estCod:string;   
    timestamp:Date;
}

export class ListaNivel{
    ListNivelId:number;
    ListNivelNom:string;
}

export class GetNivel{
   
            estCod: {
                _id: string,
                estCod: string,
                estNom: string,
                estDes: string,
                timestamp: string,
                __v: number
            }
            _id: string;
            nivNum: string;
            nivDes: string;
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

export class GetNivelFiltro{
   
    estCod: {
        _id: string,
        estCod: string,
        estNom: string,
        estDes: string,
        timestamp: string,
        __v: number
    }
    _id: string;
    nivNum: string;
    nivDes: string;
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