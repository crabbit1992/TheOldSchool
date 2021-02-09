const Ciencia = require('../model/Ciencia');
const CienciaCtrl = {};

CienciaCtrl.getCienciasCol = async (req, res) => {
 
    console.log("fdsfdfsf f");
    const ciencia = await Ciencia.find();
    console.log(ciencia);
    res.json(ciencia); 
};

CienciaCtrl.getCiencia = async (req, res) => {
    const GetParam = {
        colCod: req.body.colCod,
        cieCod: req.body.cieCod
    }

    console.log(GetParam);

    if(GetParam.cieCod==undefined){
        const ciencia = await Ciencia.find({$and:[{ colCod: GetParam.colCod }]})
        .populate('colCod');
        res.json(ciencia); 
    }
    else{
        const ciencia = await Ciencia.find({$and:[{ colCod: GetParam.colCod,_id: GetParam.cieCod }]})
        .populate('colCod');
        res.json(ciencia); 
    }

    
    
};

CienciaCtrl.createCiencia = async (req, res) => {
    
    const GetParam = {
        cieNom: req.body.cieNom,
        cieDes: req.body.cieDes,
    }

    console.log(GetParam)
    const CienciaExist = await Ciencia.findOne({$and:[{ cieNom: GetParam.cieNom}]});
    console.log(CienciaExist)
    if(CienciaExist!=undefined){
        console.log(CienciaExist);
        res.json({status:510});
    }
    else{
        const newCiencia=new Ciencia(GetParam);
        await newCiencia.save();   // se crea un nuevo registro en el documento  
        res.json({status:200}); 
    }
};

CienciaCtrl.editCiencia = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        cieNom: req.body.cieNom,
        cieDes: req.body.cieDes,
    }
    await Ciencia.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status:200}); 
};

CienciaCtrl.deleteCiencia = async (req,res)=> {

    await Ciencia.findByIdAndRemove(req.params.id);
    res.json({status:200}); 
};

module.exports = CienciaCtrl;