export class TipoNotaCurso {

    _id      :  string;
    tpoNtaCod:  string;
    aulVirCod:  string;
    curCod:     string;
    prdCod:     string;  
    colCod:     string; 
}


export class GetTipoNotaCurso{

    estCod: string;
    _id: string;
    tpoNtaCod: {
        estCod: string;
        _id: string;
        tpoNtaNom: string;
        timestamp: string;
        __v: number;
    }
    aulVirCod: string;
    curCod: string;
    colCod: string;
    prdCod: string;
    timestamp: string;
    __v: number;
}