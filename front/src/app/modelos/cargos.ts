export class Cargos {

}

export class frmEspejo{
    perRepCod :string;
    perdni:string;
    perNom:string;
    perApe:string;
    cargo:string;
}

export class frmCargo{
    var: Date = new Date();

    _id   : string   ;
    perCod:string    ;
    colCod:string    ;
    estCod:string    ;
    timestamp:Date;
}

export class Administrador{
    var: Date = new Date();

    _id   : string   ;
    perRepCod:string    ;
    colCod:string    ;
    estCod:string    ;
    timestamp:Date;
}

export class Director{
    var: Date = new Date();

    _id   : string;
    perRepCod:string;
    colCod:string;
    estCod:string;
    timestamp:Date;
}

export class SubDirector{
    var: Date = new Date();

    _id   : string   ;
    perRepCod:string    ;
    colCod:string    ;
    estCod:string    ;
    timestamp:Date;
}

export class Coordinador{
    var: Date = new Date();

    _id   : string   ;
    perRepCod:string    ;
    colCod:string    ;
    estCod:string    ;
    timestamp:Date;
}

export class Profesor{
    var: Date = new Date();

    _id   : string   ;
    perRepCod:string    ;
    colCod:string    ;
    estCod:string    ;
    timestamp:Date;
}

export class GetProfesor{
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
}


export class Auxiliar{
    var: Date = new Date();

    _id   : string   ;
    perRepCod:string    ;
    colCod:string    ;
    estCod:string    ;
    timestamp:Date;
}

export class Alumno{
    var: Date = new Date();

    _id   : string;
    apoCod:string;
    perRepCod:string;
    colCod:string;
    estCod:string;
    timestamp:Date;
}

export class GetAlumno{
    estCod:string;
        _id:string;
        perRepCod: {
            estCod:string;
            _id:string;
            perRepNom:string;
            perRepApe:string;
            perRepDni:string;
            perRepFchNac:string;
            perRepDir:string;
            perRepSex:string;
            timestamp:string;
            __v: number;
            }
        colCod:string;
        timestamp:string;
        __v: number;
}

export class AlumnoApoderado{
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
        __v: number
    }
    colCod: string;
    timestamp: string;
    __v: number;
    apoCod: string;
}



export class Secretaria{
    var: Date = new Date();

    _id   : string;
    perRepCod:string
    colCod:string;
    estCod:string;
    timestamp:Date;
}

export class Apoderado{
    var: Date = new Date();

    _id   : string;
    perRepCod:string
    colCod:string;
    estCod:string;
    timestamp:Date;
}

export class SelectCargos{
    idCargo:string;
    nombreCargo:string;
}