const TipoPago = require('../model/TipoPago');
const Pago = require('../model/Pago');
const TipoPagoCtrl = {};

TipoPagoCtrl.getTipoPago = async (req, res) => {

    const GP = {
        colCod: req.params.colCod
    }
 
    const tipoPago = await TipoPago.find({colCod: GP.colCod});
    res.json(tipoPago);
};

TipoPagoCtrl.createTipoPago = async (req, res) => {

    const newTipoPago = {
        tpoPgoNom: req.body.tpoPgoNom,
        tpoPgoDes: req.body.tpoPgoDes,
        tpoPgoMon: req.body.tpoPgoMon,
        tpoPgoReqMes: req.body.tpoPgoReqMes,
        colCod: req.body.colCod
    }
 
    const tipoPagoExist = await TipoPago.findOne({ tpoPgoNom: newTipoPago.tpoPgoNom });
    if(tipoPagoExist){
        res.json({status: 510 }); //Ya existe ese tipo de pago
    }else{
        const tipoPago = new TipoPago(newTipoPago);
        await tipoPago.save();
        res.json({status: 200 });
    } 
};

TipoPagoCtrl.editTipoPago = async (req, res) => {

    const { id } = req.params;

    const tipoPago = {
        tpoPgoNom: req.body.tpoPgoNom,
        tpoPgoDes: req.body.tpoPgoDes,
        tpoPgoMon: req.body.tpoPgoMon,
        tpoPgoReqMes: req.body.tpoPgoReqMes,
    }
 
    const tipoPagoExist = await TipoPago.findOne({ tpoPgoNom: tipoPago.tpoPgoNom });

    if(tipoPagoExist){

        if(tipoPagoExist._id==id){
            await TipoPago.findByIdAndUpdate(id, { $set: tipoPago });
            res.json({status: 200 });
        }
        else{
            res.json({status: 510 });
        }
    }
    else{
        await TipoPago.findByIdAndUpdate(id, { $set: tipoPago });
        res.json({status: 200 });
    } 
};

TipoPagoCtrl.deleteTipoPago = async(req, res) => {
   
    const { id } = req.params;

    const arrayPago = await Pago.find({tpoPgoCod: id});

    if(arrayPago.length>0){
        //No se puede eliminar porque existen pagos asociados
        res.json({status: 500 });
    }
    else{
        //Si se puede eliminar
        await TipoPago.remove({ _id: id });
        res.json({status: 200 });
    }

};

module.exports = TipoPagoCtrl;