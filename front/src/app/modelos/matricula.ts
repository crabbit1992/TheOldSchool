export class Matricula {
    var: Date = new Date();

    _id:string;
    aluCod:string;
    perRepCod:string;
    graCod:string;
    secCod:string;
    nivCod:string;
    turCod:string;
    colCod:string;
    prdCod:string;
    estCod:string;
    timestamp:Date;
}

export class GetMatricula{
   
        estCod: string;
        _id: string;
        aluCod: {
            estCod: string;
            _id: string;
            perRepCod: string;
            colCod: string;
            timestamp: string;
            __v: number;
        }
        perRepCod: {
            estCod: string;
            _id: string;
            perRepNom: string;
            perRepApe: string;
            perRepDni: string;
            perRepFchNac: string;
            perRepDir: string;
            perRepSex: string;
            timestamp: string;
            __v: number;
        }
        graCod: {
            estCod: string;
            _id: string;
            graNum: string;
            graDes: string;
            timestamp: string;
            __v: 0
        }
        secCod: {
            estCod: string;
            _id: string;
            secNom: string;
            secDes: string;
            timestamp: string;
            __v: 0
        }
        nivCod: {
            estCod: string;
            _id: string;
            nivNum: string;
            nivDes: string;
            timestamp: string;
            __v: 0
        }
        turCod: {
            estCod: string;
            _id: string;
            turNom: string;
            turDes: string;
            timestamp: string;
            __v: 0
        }
        colCod: {
            estCod: string;
            _id: string;
            colNom: string;
            colRuc: string;
            timestamp: string;
            __v: 0
        }
        prdCod: {
            estCod: string;
            _id: string;
            prdFchIni: string;
            prdFchFin: string;
            colCod: string;
            prdAnio: string;
            timestamp: string;
            __v: 0
        }
        nota:string;
        agregado:boolean=false;
        timestamp: string;
        __v: number; 
}

export class MisMatriculas{
    estCod: string;
        _id: string;
        aluCod: string;
        perRepCod: string;
        graCod: {
            estCod: string;
            _id: string;
            graNum: number,
            graDes: string;
            timestamp: string;
            __v: number;
        }
        secCod: string;
        nivCod: {
            estCod: string;
            _id: string;
            nivNum: number,
            nivDes: string;
            timestamp: string;
            __v: number;
        }
        turCod: string;
        colCod: string;
        prdCod: string;
        timestamp: string;
        __v: number;
}


export class Grado{
    graId:number;
    graNum:string;
    graDes:string;
}

export class Seccion{
    secId:number;
    secNom:string;
    secDes:string;
}

export class Nivel{
    nivId:number;
    nivNom:string;
    nivDes:string;
}

export class Turno{
    turId:number;
    turNom:string;
    turDes:string;
}