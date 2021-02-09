export class Nota {
    aluCod: string;  
    perRepCod:  string;
    areCod:     string;
    curCod:     string;
    tpoNotCurCod:  string;
    notCal:     number;
    nroClo:     string;
    prdCod:     string;
    alvCod:     string;
    colCod:     string;
}


export class GetNotaSegunTipo {
    aluCod:  string;
    perRepCod: {
        estCod:  string;
        _id:  string;
        perRepNom:  string;
        perRepApe:  string;
        perRepDni:  string;
        perRepFchNac:  string;
        perRepDir:  string;
        perRepSex:  string;
        timestamp:  string;
        __v :number
    }
    curCod: {
        areCod:  string;
        estCod:  string;
        ncoCurNom:  string;
        timestamp:  string;
        __v: number;
        _id:  string;
    }
    tpoNotCurCod:  string;
    tpoNta: {
        estCod:  string;
        _id:  string;
        tpoNtaNom:  string;
        timestamp:  string;
        __v: number
    }
    cantNota:number;
    prmCur : number;
    ptsEql : number;
}

export class GetNotasFiltradas{

    _id: string;
    tpoNotCurCod: string;
    tpoNtaCod: {
        estCod: string;
        _id: string;
        tpoNtaNom: string;
        timestamp: string;
        __v: number;
    }
    notCal: number;
    fecha: string;
}


