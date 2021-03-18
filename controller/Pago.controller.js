const Pago = require('../model/Pago');
const TipoPago = require('../model/TipoPago');
const PagoCtrl = {};

PagoCtrl.getPagos = async (req, res) => {

    const GP = {
        colCod: req.params.colCod
    }
 
    const pago = await Pago.find({colCod: GP.colCod})
    .populate("tpoPgoCod").populate("pgoPerAso").populate("pgoPerReg").sort({ "pgoFch" :  -1 });
    res.json(pago);
};

PagoCtrl.filterPago = async (req, res) => {
    
    const id = req.params.id
    const colCod = req.params.colCod;

    console.log(id);
    if(id=="..."){
        const pago = await Pago.find({colCod: colCod})
        .populate("tpoPgoCod").populate("pgoPerAso").populate("pgoPerReg").sort({ "pgoFch" :  -1 });
        res.json(pago);
    }
    else{
        const pago = await Pago.find({ tpoPgoCod: id})
        .populate("tpoPgoCod").populate("pgoPerAso").populate("pgoPerReg").sort({ "pgoFch" :  -1 });
        res.json(pago);
    }
};

PagoCtrl.createPago = async (req, res) => {

    const newPago = {
        pgoCod   : "",                   //Codigo de pago generado
        pgoPerReg: req.body.pgoPerReg,   //persona que registra
        pgoPerAso: req.body.pgoPerAso,   //persona que es asociada al pago
        pgoDes   : req.body.pgoDes,      //descripcion del concepto del pago
        pgoMes   : req.body.pgoMes,      //mes del que se esta pagando
    
        pgoMto   : req.body.pgoMto,      //monto del pago
        tpoPgoCod: req.body.tpoPgoCod,   //codigo del tipo de pago
        colCod   : req.body.colCod       //codigo del colegio
    }

    var d = new Date();
    var dia= d.getUTCDate();
    var mes= d.getUTCMonth()+1;
    var anio= d.getUTCFullYear();
    var hor= d.getHours();
    var min= d.getMinutes();
    var seg= d.getSeconds();
    const identificador= newPago.pgoPerAso.substr(-4);
    newPago.pgoCod=dia+""+mes+""+anio+""+identificador+""+hor+""+min+""+seg+"";

    const pago = new Pago(newPago);
    await pago.save();
    res.json({status: 200 });
};

PagoCtrl.deletePago = async (req,res)=> {

    await Pago.remove();
    res.json({status: 200 });
};



module.exports = PagoCtrl;