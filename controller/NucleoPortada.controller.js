const NucleoPortada = require('../model/NucleoPortada');
const nucleoPortadaCtrl = {};

nucleoPortadaCtrl.getNucleoPortadas = async (req, res) => {

    const nucleoPortada = await NucleoPortada.find()
    .populate('imgCod');

    res.json(nucleoPortada); 
};


nucleoPortadaCtrl.createNucleoPortada = async (req, res) => {
    const GP = {
        imgCod  : req.body.imgCod,
    }

    const newNucleoPortada=new NucleoPortada(GP);
    await newNucleoPortada.save();   // se crea un nuevo registro en el documento  
    res.json({status: 200 });
    
};

nucleoPortadaCtrl.editNucleoPortada = async (req,res)=> {
    const {id}=req.params;
    const GP={
        imgCod: req.body.imgCod
    }
    
    await NucleoPortada.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

nucleoPortadaCtrl.deleteNucleoPortada = async (req,res)=> {
    await NucleoPortada.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = nucleoPortadaCtrl;
