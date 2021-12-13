export class Libro {

    _id:string;
    
    libTtl: string;
    libInt: string;
    libDed: string;
    libBib: string;
    libPre: string;
    imgCod: string;
    areCod: string;
    curCod: string;
    graCod: string;
    nivCod: string;
    colCod: string;

}

export class GetLibro{

    estCod: string;
        _id: string;
        libTtl: string;
        areCod: {
            estCod: string;
            _id: string;
            ncoAreNom: string;
            timestamp: string;
            __v: number;
        }
        curCod: {
            estCod: string;
            _id: string;
            areCod: string;
            ncoCurNom: string;
            timestamp: string;
            __v: number;
        }
        graCod: {
            estCod: string;
            _id: string;
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
            __v: number;
        }
        colCod: string;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
}