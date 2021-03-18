export class Pago {

    _id       :string;

    pgoCod    : string; // autogenerado en backend
    pgoPerReg : string; // Persona que registra
    pgoPerAso : string; // Persona asociada *
    pgoDes    : string; // Descripcion de pago *
    pgoMes    : string; // Mes de pago *
    pgoFch    : string; // fecha de operacion 
    pgoMto    : number; // Monto de pago *
    tpoPgoCod : string; // //Tipo de pago cod (concepto) *
    colCod    : string; 
    estCod    : string;
    timestamp : string;
}

export class ArrayPago {

  
        tpoPgoCod: {
            estCod: string;
            _id: string;
            tpoPgoNom: string;
            colCod: string;
            timestamp: string;
            __v: number;
        }
        estCod: string;
        _id: string;
        pgoCod: string;
        pgoPerReg: {
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
        pgoPerAso: {
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
        pgoDes: string;
        pgoMes: string;
        pgoMto: number;
        colCod: string;
        pgoFch: string;
        timestamp: string;
        __v: number;
  
}


