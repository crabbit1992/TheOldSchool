const Grado = require('../model/Grado');
const GradoCtrl = {};

GradoCtrl.getGrados = async (req, res) => {
    const grado = await Grado.find()
    res.json(grado); 
};

GradoCtrl.createGrado = async (req, res) => {
    const GetParam = {
        graNum: req.body.graNum,
        graDes: req.body.graDes,
    }

    const GradoExist = await Grado.findOne({$and:[{ graNom: GetParam.graNum}]});

    if(GradoExist!=undefined){
        console.log(GradoExist);
        res.json({status:510});
    }
    else{
        const newGrado=new Grado(GetParam);
        await newGrado.save();   // se crea un nuevo registro en el documento  
        res.json({status:200});
    }
};

GradoCtrl.editGrado = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        graDes: req.body.graDes,
    }
    await Grado.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status:200});
};

GradoCtrl.deleteGrado = async (req,res)=> {

    await Grado.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = GradoCtrl;