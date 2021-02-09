export class DetallePeriodo {
    _id         :string;
    prdCod      :string;
    tpoPrdCod   :string; //Tipo de periodo
    detPrdSgt   :string;      // Segmmento del periodo (primer, segundo, tercer o cuarto bimeste)
    detPrdIni   :string;      // Inicio del segmento del periodo
    detPrdFin   :string;      // Fin del segmento del periodo
}

export class GetDetallePeriodo {
    estCod: string;
    _id: string;
    prdCod: {
        estCod: string;
        _id: string;
        prdFchIni: string;
        prdFchFin: string;
        tpoPrdCod: string;
        colCod: string;
        prdAnio: string;
        timestamp: string;
        __v: number
    }
    tpoPrdCod: {
        estCod: string;
        _id: string;
        tpoPrdNom: string;
        timestamp: string;
        __v: number
    }
    detPrdSgt: string;
    detPrdIni: string;
    detPrdFin: string;
    timestamp: string;
    __v: number
}

export class arraySegmento {
    _id: string;
    nom: string;
}