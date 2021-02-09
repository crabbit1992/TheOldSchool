const Nivel = require('../model/Nivel');
const NivelCtrl = {};

NivelCtrl.getNivel = async (req, res) => {
    const nivel = await Nivel.find()
    res.json(nivel); 
};

NivelCtrl.createNivel = async (req, res) => {
    const GetParam = {
        nivNum: req.body.nivNum,
        nivDes: req.body.nivDes,

    }

    const NivelExist = await Nivel.findOne({ nivDes: GetParam.nivDes});

    if(NivelExist!=undefined){
        console.log(NivelExist);
        res.json({status:510});
    }
    else{
        const newNivel=new Nivel(GetParam);
        await newNivel.save();   // se crea un nuevo registro en el documento  
        res.json({status:200});
    }
};

NivelCtrl.editNivel = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        nivDes: req.body.nivDes,
    }
    await Nivel.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status:200});
};

NivelCtrl.deleteNivel = async (req,res)=> {

    await Nivel.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = NivelCtrl;