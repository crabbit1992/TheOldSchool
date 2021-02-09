export class Periodo {  //Clase Periodo
   

    _id: string;        // Codigo interno del registro
    prdAnio:string;     // Año del periodo
    prdFchIni: string;  // Fecha de inicio del periodo
    prdFchFin: string;  // Fecha de fin del periodo
    tpoPrdCod: string;  // tipo de periodo
    colCod:string;      // colegio al que corresponde el periodo
    estCod:string;      // estado del periodo ( Culminado, Activo, En progreso )
    timestamp:string;     // Fecha de creacion del registro
}

export class GetPeriodo{
    var: Date = new Date();

    
    estCod: {
        _id: string;
        estCod:string;
        estNom: string;
        estDes:string;
        timestamp: Date;
        __v: number
    }
        _id: string;
        prdFchIni: string;
        prdFchFin: string;
        colCod: {
            estCod: string;
            _id: string;
            colNom: string;
            colRuc: string;
            timestamp: Date;
            __v: 0
        }
        prdAnio: string;
        timestamp: Date;
        __v: number;
        tpoPrdCod: {
            estCod: string;
            _id: string;
            tpoPrdNom: string;
            timestamp: string;
            __v: 0
        }
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