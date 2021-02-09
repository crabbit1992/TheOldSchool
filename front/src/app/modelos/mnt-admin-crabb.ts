export class MntAdminCrabb {
}

export class NucleoImg {
    _id:            string;
    ncoImgTtl:      string;    // Titulo de la img
    ncoImgDes:      string;    // Descripcion de la img
    ncoImgRta:      string;    // Ruta de la imagen
    ncoImgOrgNom:   string; // Nombre original de la imagen
    ncoImgTpoAch:   string; // Tipo de archivo
    ncoImgTmñ:      string;    // Peso de la imagen
    estCod:         string;  
    timestamp:      string;
}

/**Nucleo Portada */
export class NucleoPortada {
    _id:    string;
    imgCod: string;
}

export class GetNucleoPortada {
    _id:            string;
    imgCod:{
        estCod:  string;
        _id:  string;
        ncoImgTtl:  string;
        ncoImgDes:  string;
        ncoImgRta:  string;
        ncoImgOrgNom:  string;
        ncoImgTpoAch:  string;
        ncoImgTmñ: number;
        timestamp:  string;
        __v: number;
    }
}

/**Nucleo Area */
export class NucleoArea{
    _id:        string;
    ncoAreNom:  string;
    ncoAreDes:  string;
    estCod:     string;
    timestamp:  string;
}


/** Nucleo Curso */
export class NucleoCurso{
    _id:        string;
    areCod:     string;
    ncoCurNom:  string;
    ncoCurDes:  string;
    estCod:     string;
    timestamp:  string;
}

export class GetNucleoCurso{
    _id:        string;
    areCod:{
        estCod: string;
        ncoAreNom: string;
        timestamp: string;
        __v: number;
        _id: string;
    }
    ncoCurNom:  string;
    ncoCurDes:  string;
    estCod:     string;
    timestamp:  string;
}

/** Nucleo Curricula */
export class NucleoCurricula{
    _id:        string;
    prd:string;
    areCod:string;
    curCod:string;
    estCod:string;
}

export class GetNucleoCurricula{
    estCod: string;
    _id: string;
    prd: string;
    areCod: {
        estCod: string;
        _id: string;
        ncoAreNom: string;
        timestamp: string;
        __v: 0;
    }
    curCod: {
        estCod: string;
        _id: string;
        areCod: string;
        ncoCurNom: string;
        timestamp: string;
        __v: number
    }
    timestamp: string;
    __v: number
}

export class NucleoAnio{
    idAnio:number;
    nomAnio:string;
}
