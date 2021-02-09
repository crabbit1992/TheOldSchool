export class Ciencia {
    var: Date = new Date();

    _id:string;
    cieNom:string;
    cieDes:string;
    colCod:string;
    estCod:string;   
    timestamp:Date;
}

export class GetCiencia {
    estCod: string;
    _id: string;
    cieNom: string;
    cieDes: string;
    colCod: {
        estCod: string;
        _id: string;
        colNom: string;
        colRuc: string;
        timestamp: string;
        __v: number;
    };
    timestamp: string;
    __v: number;
}
export class GetSelectCiencia {
    estCod: string;
    _id: string;
    cieNom: string;
    cieDes: string;
    colCod: {
        estCod: string;
        _id: string;
        colNom: string;
        colRuc: string;
        timestamp: string;
        __v: number;
    };
    timestamp: string;
    __v: number;
}

export class GetSltCiencia {
    estCod: string;
    _id: string;
    cieNom: string;
    cieDes: string;
    colCod: {
        estCod: string;
        _id: string;
        colNom: string;
        colRuc: string;
        timestamp: string;
        __v: number;
    };
    timestamp: string;
    __v: number;
}