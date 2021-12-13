export class Evaluacion {

    _id:string;
    evaPta:string;
    evaRpt: [];
    imgCod:string;
    evaOpc:[];
    evaPtsEqt:string;
    nroOrd:string;
    libCod:string;
    temCod:string;
    colCod:string;

}

export class GetEvaluacion{

    estCod: string;
        _id: string;
        evaPta: string;
        evaRpt: [
            {
                _id: string;
                evaRpt: number;
            }
        ]
        evaOpc: [
            {
                _id: string;
                evaOpc: number;
            },
           
        ]
        evaPtsEqt: number;
        libCod: string;
        temCod: string;
        colCod: string;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        __v: number;

}
