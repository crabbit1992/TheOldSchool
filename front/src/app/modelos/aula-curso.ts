export class AulaCurso {
    var: Date = new Date();

    _id:string;
    aulVirCod:string;
    areCod:string;
    curCod:string;
    prfCod:string;
    perRepCod:string;
    colCod:string;
    prdCod:string;
    estCod:string;  
    timestamp:Date;
}

export class GetAulaCurso {
    estCod: string;  
        _id: string;  
        aulVirCod: string;  
        areCod:{
            estCod: string;  
            ncoAreNom: string;  
            timestamp: string;  
            __v: number;
            _id: string;  
        }
        curCod: {
            estCod: string;  
            _id   : string;  
            areCod: string;  
            ncoCurNom: string;  
            curDes: string;  
            colCod: string;  
            timestamp: string;  
            __v: number;
        }
        prfCod      : string;  
        perRepCod   : string;  
        colCod      : string;  
        prdCod      : string;  
        timestamp   : string;  
        __v: number;
}

export class DocenteCurso {
    estCod: string; 
        _id: string; 
        aulVirCod: string; 
        curCod: string; 
        prfCod: string; 
        perRepCod: {
            estCod: string; 
            _id: string; 
            perRepNom:  string; 
            perRepApe: string; 
            perRepDni: string; 
            perRepFchNac: string; 
            perRepDir: string; 
            perRepSex: string; 
            timestamp: string; 
            __v: number;
        }
        colCod: string; 
        prdCod: string; 
        timestamp: string; 
        __v: number;
}

export class GetCurso {
    areCod: string; 
    aulVirCod: string; 
    colCod: string; 
    curCod:{
        areCod: string; 
        estCod: string; 
        ncoCurNom: string; 
        timestamp: string; 
        __v: number;
        _id: string; 
      
    }
    estCod: string; 
    perRepCod: string; 
    prdCod: string; 
    prfCod: string; 
    timestamp: string; 
    __v: number;
    _id: string; 
}
