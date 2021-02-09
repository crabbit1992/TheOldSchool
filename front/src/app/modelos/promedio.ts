export class Promedio {

     estCod :  string;
         _id :  string;
         aluCod :  string;
         perRepCod : {
             estCod :  string;
             _id :  string;
             perRepNom :  string;
             perRepApe :  string;
             perRepDni :  string;
             perRepFchNac :  string;
             perRepDir :   string;
             perRepSex :  string;
             timestamp :  string;
             __v : number;
        }
         curCod :  string;
         nroClo :  string;
         prdCod :  string;
         alvCod :  string;
         colCod :  string;
         timestamp :  string;
         __v : number;
         promedio : number;
}


export class PromedioArea {

    estCod: string;
    _id: string;
    aluCod: string;
    perRepCod: string;
    areCod:{
        estCod: string;
        _id: string;
        ncoAreNom: string;
        timestamp: string;
        __v: number;
    }
    nroClo: string;
    prdCod: string;
    alvCod: string;
    promedio: number;
    colCod: string;
    timestamp: string;
    __v: number;
}

export class PromedioCursos{
    estCod: string;
        _id: string;
        aluCod: string;
        perRepCod: string;
        areCod: string;
        curCod: {
            estCod: string;
            _id: string;
            areCod: string;
            ncoCurNom: string;
            timestamp: string;
            __v: number;
        }
        nroClo: string;
        prdCod: string;
        alvCod: string;
        colCod: string;
        promedio: number;
        timestamp: string;
        __v: number;
}

export class GetLibretaTrimestral{
    perRepCod: string;
        grado: {
            estCod: string;
            _id: string;
            graNum: 5,
            graDes: string;
            timestamp: string;
            __v: number;
        }
        nivel: {
            estCod: string;
            _id: string;
            nivNum: 1,
            nivDes: string;
            timestamp: string;
            __v: number;
        }
        area: {
            estCod: string;
            _id: string;
            ncoAreNom: string;
            timestamp: string;
            __v: number;
        }
        primerTrimestre: {
            nroClo: string;
            promedio: number;
        }
        segundoTrimestre: {
            nroClo: string;
            promedio: number;
        }
        tercerTrimestre: {
            nroClo: string;
            promedio: number;
        }
        promedioFinal: number;
}

export class GetLibretaBimestral{
    perRepCod: string;
        grado: {
            estCod: string;
            _id: string;
            graNum: 5,
            graDes: string;
            timestamp: string;
            __v: number;
        }
        nivel: {
            estCod: string;
            _id: string;
            nivNum: 1,
            nivDes: string;
            timestamp: string;
            __v: number;
        }
        area: {
            estCod: string;
            _id: string;
            ncoAreNom: string;
            timestamp: string;
            __v: number;
        }
        primerTrimestre: {
            nroClo: string;
            promedio: number;
        }
        segundoTrimestre: {
            nroClo: string;
            promedio: number;
        }
        tercerTrimestre: {
            nroClo: string;
            promedio: number;
        }
        promedioFinal: number;
}

