const TipoPeriodo = require('../model/TipoPeriodo');
const TipoPeriodoCtrl = {};

TipoPeriodoCtrl.getTipoPeriodos = async (req, res) => {
    const tipoPeriodo = await TipoPeriodo.find();
    console.log(tipoPeriodo);
    res.json(tipoPeriodo);
};

TipoPeriodoCtrl.createTipoPeriodo = async (req, res) => {
    const tipoPeriodo=new  TipoPeriodo(req.body);
    await tipoPeriodo.save();
    res.json({status: 200 });
};

TipoPeriodoCtrl.getTipoPeriodo = async (req, res) => {
    const tipoPeriodo= await TipoPeriodo.findById(req.params.id);
    console.log(tipoPeriodo);
    res.json(tipoPeriodo); 
};

TipoPeriodoCtrl.editTipoPeriodo = async (req,res)=> {
    const {id}=req.params;
    const tipoPeriodo={
        tpaNom:req.body.tpaNom,
        tpaDsc:req.body.tpaDsc,
    }
    await TipoPeriodo.findByIdAndUpdate(id,{$set:tipoPeriodo});
    res.json({status: 200 });
};

module.exports = TipoPeriodoCtrl;