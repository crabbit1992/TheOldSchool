const TipoAccion = require('../model/TipoAccion');
const TipoAccionCtrl = {};

TipoAccionCtrl.getTipoAcciones = async (req, res) => {
    const tipoAccion = await TipoAccion.find();
    console.log(tipoAccion);
    res.json(tipoAccion);
};

TipoAccionCtrl.createTipoAccion = async (req, res) => {
    const tipoAccion=new  TipoAccion(req.body);
    await tipoAccion.save();
    res.json({status: 200 });
};

TipoAccionCtrl.getTipoAccion = async (req, res) => {
    const tipoAccion= await TipoAccion.findById(req.params.id);
    console.log(tipoAccion);
    res.json(tipoAccion); 
};

TipoAccionCtrl.editTipoAccion = async (req,res)=> {
    const {id}=req.params;
    const tipoAccion={
        tpaNom:req.body.tpaNom,
        tpaDsc:req.body.tpaDsc,
    }
    await TipoAccion.findByIdAndUpdate(id,{$set:tipoAccion});
    res.json({status: 200 });
};

module.exports = TipoAccionCtrl;