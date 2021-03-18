export class TipoPago {

    _id:string;

    tpoPgoNom :string;
    tpoPgoDes :string;
    tpoPgoMon :number=0;
    tpoPgoReqMes: string; //Requerir mes? ( "1" req || "2" no-req )
    colCod    :string;
    estCod    :string;     
    timestamp :string;

}


export class ArrayTipoPago {

    _id:string;

    tpoPgoNom :string;
    tpoPgoDes :string;
    tpoPgoMon :string;
    colCod    :string;
    estCod    :string;     
    timestamp :string;

}