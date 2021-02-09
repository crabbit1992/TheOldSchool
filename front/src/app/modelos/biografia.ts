export class Biografia {
    
        estCod: string;
        _id: string;
        quienesSomos: [
            {
                mision: [
                    {
                        _id: string;
                        misDes: string;
                        misImg: string;
                    }
                ],
                vision: [
                    {
                        _id: string;
                        visDes: string;
                        visImg: string;
                    }
                ],
                valores: [
                    {
                        _id: string;
                        valDes: string;
                        valImg: string;
                    }
                ],
                _id: string;
            }
        ]
        colCod: string;
        actividades: [
            {
                _id: string;
                actTtl: string;
                actDes: string;
                actImg: string;
            }
        ]
        talleres: []
        niveles: []
        Infraestructura: []
        timestamp: string;
        __v: number;
    
}

//Quienes somos
export class QuienesSomos {
    _id:string;
    qsTtl:string;
    qsDes:string;
    imgCod:string;
    colCod:string;
    estCod:string;
    timestamp:string;
}

export class GetQuienesSomos {  
        estCod: string;
        _id: string;
        qsTtl: string;
        qsDes: string;
        imgCod: {
            estCod:string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number
        }
        colCod: string;
        timestamp: string;
        __v: number   
}

export class objMision{
    estCod: string;
        _id: string;
        qsTtl: string;
        qsDes: string;
        imgCod: {
            estCod:string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number
        }
        colCod: string;
        timestamp: string;
        __v: number  
}

export class objVision{
    estCod: string;
        _id: string;
        qsTtl: string;
        qsDes: string;
        imgCod: {
            estCod:string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number
        }
        colCod: string;
        timestamp: string;
        __v: number  
}

export class objValores{
    estCod: string;
        _id: string;
        qsTtl: string;
        qsDes: string;
        imgCod: {
            estCod:string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number
        }
        colCod: string;
        timestamp: string;
        __v: number  
}

//Actividades
export class Actividades{
    _id: string;
    actTpo: string;
    actTtl: string;
    actDes: string;
    imgCod: string;
    colCod: string;
    estCod:string;
    timestamp:string;
}

export class GetActividades{
    _id: string;
    actTpo: string;
    actTtl: string;
    actDes: string;
    imgCod: {
        estCod:string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number
    }
    colCod: string;
    timestamp: string;
    __v: number  
}

//Nivel
export class BioNiveles{
    _id:string;
    nivTpo:string;
    nivTtl:string;
    nivDes:string;
    imgCod:string;
    colCod:string;
    estCod:string;
    timestamp:string;
}

export class GetBioNivel{
    estCod: string;
        _id: string;
        nivTpo: string;
        nivTtl: string;
        nivDes: string;
        imgCod: {
            estCod: string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number;
        }
        colCod: string;
        timestamp: string;
        __v: number;
}

//Taller
export class BioTaller{
    _id:string;
    talTpo:string;
    talTtl:string;
    talDes:string;
    imgCod:string;
    colCod:string;
    estCod:string;
    timestamp:string;
}

export class GetBioTaller{
    estCod: string;
        _id: string;
        talTpo: string;
        talTtl: string;
        talDes: string;
        imgCod: {
            estCod: string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number
        }
        colCod: string;
        timestamp: string;
        __v: number
}

//Infraestructura
export class BioInfraestructura{
    _id:string;
    infTpo:string;
    infTtl:string;
    infDes:string;
    imgCod:string;
    colCod:string;
    estCod:string;
    timestamp:string;
}

export class GetBioInfraestructura{
    estCod: string;
        _id: string;
        infTpo: string;
        infTtl: string;
        infDes: string;
        imgCod: {
            estCod: string;
            _id: string;
            colImgTtl: string;
            colImgDes: string;
            colImgRta: string;
            colImgOrgNom: string;
            colImgTpoAch: string;
            colImgTmñ: string;
            tpoImgCod: string;
            colCod: string;
            timestamp: string;
            __v: number;
        }
        colCod: string;
        timestamp: string;
        __v: number;
}

//Anuncios
export class BioAnuncio{
    _id:string;
    imgCod:string;
    colCod:string;
    estCod:string;
    timestamp:string;
}

export class GetBioAnuncio{
    _id:string;
    imgCod: {
        estCod: string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number;
    }
    colCod:string;
    estCod:string;
    timestamp:string;
}

//Portadas
export class BioPortada{
    _id:string;
    imgCod:string;
    colCod:string;
    estCod:string;
    timestamp:string;
}

export class GetBioPortada{
    _id:string;
    imgCod: {
        estCod: string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number;
    }
    colCod:string;
    estCod:string;
    timestamp:string;
}


export class arrayNivelTpo{
    _id:string;
    name:string;
}


export class arrayTpoQs{
    _id: string;
    name: string;   
}

//Emblema
export class objEmblema{
    colImgEmb:string;
    colCod: string;
}

export class getObjEmblema{
    colBioQss: boolean;
    colBioAct: boolean;
    colBioNiv: boolean;
    colBioTal: boolean;
    colBioInf: boolean;
    _id: string;
    estCod: string;
    colNom: string;
    colRuc: string;
    timestamp: string;
    __v: number;
    colImgPfl: {
        estCod: string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number;
    }
    colUrl: string;
    colImgEmb: {
        estCod: string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number;
    }
}

//Imagen de perfil
export class objImgPfl{
    colImgPfl:string;
    colCod: string;
}

export class getObjImgPfl{
    colBioQss: boolean;
    colBioAct: boolean;
    colBioNiv: boolean;
    colBioTal: boolean;
    colBioInf: boolean;
    _id: string;
    estCod: string;
    colNom: string;
    colRuc: string;
    timestamp: string;
    __v: number;
    colImgPfl: {
        estCod: string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number;
    }
    colUrl: string;
    colImgEmb: {
        estCod: string;
        _id: string;
        colImgTtl: string;
        colImgDes: string;
        colImgRta: string;
        colImgOrgNom: string;
        colImgTpoAch: string;
        colImgTmñ: string;
        tpoImgCod: string;
        colCod: string;
        timestamp: string;
        __v: number;
    }
}

