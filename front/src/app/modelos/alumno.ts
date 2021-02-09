export class Alumno {

}

export class GetAlumno {
    estCod: string;
    _id: string;
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
    };
    colCod: {
        estCod: string;
        _id: string;
        colNom: string;
        colRuc: string;
        timestamp: string;
        __v: number;
    };
    timestamp: string;
    __v: number;
}


export class GetAlumApo{
    estCod: string;
        _id: string;
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
        colCod: string;
        timestamp: string;
        __v: number;
        apoCod: string;
}