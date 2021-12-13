export class AulaVirtual {
    _id:string;
    graCod:string;
    secCod:string;
    nivCod:string;
    turCod:string;
    prdCod:string;
    colCod:string;
}

export class GetAulaVirtual{
        estCod: string;
        _id: string;
        graCod: {
            estCod: string;
            _id: string;
            graNum: number;
            graDes: string;
            timestamp: string;
            __v: number;
        }
        secCod: {
            estCod: string;
            _id: string;
            secNom: string;
            secDes: string;
            timestamp: string;
            __v: number
        }
        nivCod: {
            estCod: string;
            _id: string;
            nivNum: string;
            nivDes: string;
            timestamp: string;
            __v: number;
        }
        turCod: {
            estCod: string;
            _id: string;
            turNom: string;
            turDes: string;
            timestamp: string;
            __v: number;
        }
        colCod: string;
        timestamp: string;
        __v: number;
}
