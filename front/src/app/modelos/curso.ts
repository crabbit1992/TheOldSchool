export class Curso {
    var: Date = new Date();

    _id:string;
    cieCod:string;
    curNom:string;
    curDes:string;
    colCod:string;
    estCod:string;   
    timestamp:string;
}

export class GetCurso {
    estCod: string;
        _id: string;
        cieCod: {
            estCod: string;
            _id: string;
            cieNom: string;
            cieDes: string;
            colCod: string;
            timestamp: string;
            __v: number;
        }
        curNom: string;
        curDes: string;
        colCod: string;
        timestamp: string;
        __v: number
}

