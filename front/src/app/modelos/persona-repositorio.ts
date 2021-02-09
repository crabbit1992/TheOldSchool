export class PersonaRepositorio {
    var: Date = new Date();
    _id: string;
    perRepNom: string="";
    perRepApe: string="";
    perRepDni: string="";
    perRepFchNac: string="";
    perRepDir: string="";
    perRepSex: string="";
    estRepCod: string="";
    timestamp: Date;
}

export class FrmPersona{
    perId: string;
    perNom: string;
    perApe: string;
    perDni: string;
    perSex: string;
    perDir: string;
    perDia: string;
    perMes: string;
    perAnio: string;
}

export class Dia{
    idDia:number;
    nomDia:string;
}

export class Mes{
    idMes:number;
    nomMes:string;
}

export class Anio{
    idAnio:number;
    nomAnio:string;
}