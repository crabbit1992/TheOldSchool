export class Subtema {

    _id:string;
    libCod:string;
    temCod:string;
    nroOrd:string;
    subTemTtl:string;
    subTemDes:string;
    imgCod:string;
    
}

export class GetSubTema {

    estCod: string;
    _id: string;
    libCod: string;
    temCod: string;
    nroOrd: number;
    subTemTtl: string;
    subTemDes: string;
    imgCod: {
        estCod: string;
        _id: string;
        ImgAllRta: string;
        ImgAllOrgNom: string;
        ImgAllTpoAch: string;
        ImgAllTmñ: string;
        timestamp: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    timestamp: string;
    __v: 0

}
