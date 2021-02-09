export class CursoGrado {
    var: Date = new Date();

    _id:string;
    graCod:string;
    nivCod:string;
    curCod:string;
    areCod:string;
    colCod:string;
    estCod:string;   
    timestamp:string;
}

export class GetCursoGrado{
    estCod: string;   
        _id: string;
        graCod: {
            estCod: string;
            _id:string;
            graNum: number,
            graDes: string;
            timestamp: string;
            __v: number;
        }
        nivCod: {
            estCod: string;
            _id: string;
            nivNum: number,
            nivDes: string;
            timestamp: string;
            __v: number,
        }
        curCod: {
            estCod: string;
            _id: string;
            areCod: string;
            ncoCurNom: string;
            timestamp: string;
            __v:number,
        }
        areCod: {
            estCod: string;
            _id: string;
            ncoAreNom: string;
            timestamp: string;
            __v: number,
        }
        colCod: string;
        timestamp: string;
        __v: number
}


