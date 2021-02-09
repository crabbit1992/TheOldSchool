const TipoNota = require('../model/TipoNota');

const TipoNotaCtrl = {};


TipoNotaCtrl.createTipoNota= async (req, res) => {

    const GP={
        tpoNtaNom:req.body.tpoNtaNom,
    }

    const tipoNota=new  TipoNota(GP);

    await tipoNota.save();
    res.json({status: 200 });

};

TipoNotaCtrl.getTipoNota= async (req, res) => {

    const tipoNota=await TipoNota.find();
    res.json(tipoNota);

};

TipoNotaCtrl.removeTipoNota= async (req, res) => {

    await TipoNota.findByIdAndRemove(req.params.id );
    res.json({status: 200 });

};



module.exports = TipoNotaCtrl;