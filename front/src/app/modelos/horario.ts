export class Horario {

    _id   :string;
    curCod:string;
    hroDia:string;
    itvHroCod:string;
    alvCod:string;
    colCod:string;

}

export class GetHorario {
    itvHroCod: {
        _id: string;
        intHraIni: string;
        intHraFin: string;
    }
    dia:string;
    lunes: {
        areCod: string;
        estCod: string;
        ncoCurNom: string;
    }
    martes: {
        areCod: string;
        estCod: string;
        ncoCurNom: string;
    }
    miercoles: {
        areCod: string;
        estCod: string;
        ncoCurNom: string;
    }
    jueves: {
        areCod: string;
        estCod: string;
        ncoCurNom: string;
    }
    viernes: {
        areCod: string;
        estCod: string;
        ncoCurNom: string;
    }
    sabado:{
        areCod: string;
        estCod: string;
        ncoCurNom: string;
    }
}

export class HorarioModal {
    itvHroCod:string;
    intHraIni: string;
    intHraFin: string;
    curCod   : string;
    dia      : string;    
    alvCod   : string;   
    prdCod   : string;
    colCod   : string;
}

