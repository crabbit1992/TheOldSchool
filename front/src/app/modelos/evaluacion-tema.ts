export class EvaluacionTema {

    _id:string;

    libCod:string;
    temCod:string;
    perRepCod:string;
    colCod:string;
    evaTemNroIto:number;
    evaTemNta:number;
    prdCod:string;
    graCod:string;
    secCod:string;
    nivCod:string;
}

export class GetEvaluacionTema {

    _id:string;

    libCod:string;
    temCod:string;
    perRepCod:{
        estCod: string;
        perRepApe: string;
        perRepDir: string;
        perRepDni: string;
        perRepFchNac: string;
        perRepNom: string;
        perRepSex: string;
        timestamp: string;
        __v: 0
        _id: string;
    };
    colCod:string;
    evaTemNroIto:number;
    evaTemNta:number;
    prdCod:string;
    graCod:string;
    secCod:string;
    nivCod:string;
}


