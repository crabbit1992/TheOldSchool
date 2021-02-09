export class Perfil {
   
    var: Date = new Date();

        estCod:{
            _id: string;
            estCod: string;
            estNom: string;
            estDes: string;
            timestamp: string;
            __v: 0
        }
        _id: string;
        perRepCod: {
            estCod: string;
            _id: string;
            perRepDni: string;
            perRepNom: string;
            perRepApe: string;
            perRepFchNac: string;
            perRepDir: string;
            perRepSex: string;
            timestamp: Date;
            __v: number;
        }
        codMiem: string
        carCod: {
            estCod: string;
            _id: string;
            carNom: string;
            carDes: string;
            timestamp: Date;
            __v: number;
        }
        colCod: {
            estCod: string;
            _id: string;
            colNom: string;
            colRuc: string;
            timestamp: Date;
            __v: number;
        }
        timestamp: Date;
        __v:number;
}

export class PerfilClass{

    _id:string;

    perRepCod: string;
    codMiem: string;
    carCod:string;
    colCod:string;
    estCod:string;  
}

export class PerfilFrm{
    perRepNom: string;
    perRepApe: string;
    perRepDni:string;
 
}