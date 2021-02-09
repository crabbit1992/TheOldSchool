export class Persona {
    var: Date = new Date();


    _id: string;
    perRep_Id: string="";
    perNom: string="";
    perApe: string="";
    perDni: string="";
    perCorreo: string="";
    perPas:string="";
    perFchNac: string="";
    perDir: string="";
    perSex: string="";
    estCod: string="";
    timestamp: Date;
}

export class FrmPersona{

    perRep_id: string;
    perNom: string;
    perApe: string;
    perDni: string;
    perCorreo: string;
    perPas:string;
    perSex: string;
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