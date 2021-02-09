export class Turno {
    var: Date = new Date();

    _id:string;
    turNom:string;
    turDes:string;
    colCod:string;
    estCod:string;   
    timestamp:Date;
}

export class ListaTurno{
    ListTurnoId:number;
    ListTurnoNom:string;
}

export class GetTurno{

   
            estCod: {
                _id: string,
                estCod: string,
                estNom: string,
                estDes: string,
                timestamp: string,
                __v: number
            }
            _id: string;
            turNom: string;
            turDes: string;
            colCod: {
                estCod: string,
                _id: string,
                colNom: string,
                colRuc: string,
                timestamp: string,
                __v: number
            }
            timestamp: string;
            __v: number;
}