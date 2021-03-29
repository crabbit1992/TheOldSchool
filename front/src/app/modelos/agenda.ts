export class Agenda {
    ageTtl:string;
    ageDes:string;
    ageCre:string;
    ageCur:string;
    alvCod:string;
    colCod:string;
    estCod:string;
    timestamp:  string;
}

export class getAgenda {
    estCod: {
        _id: string;
        estCod: string;
        estNom: string;
        estDes: string;
        timestamp: string;
        __v: 0
    }
    _id: string;
    ageTtl: string;
    ageDes: string;
    ageCre: string;
    ageCur: {
        estCod: string;
        _id: string;
        areCod: string;
        ncoCurNom: string;
        timestamp: string;
        __v: 0
    }
    alvCod: string;
    colCod: string;
    timestamp: string;
    __v: 0
}
