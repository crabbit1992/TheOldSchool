const Seccion = require('../model/Seccion');
const SeccionCtrl = {};

SeccionCtrl.getSeccion= async (req, res) => {
    const seccion = await Seccion.find()
    res.json(seccion); 
};

SeccionCtrl.createSeccion = async (req, res) => {
    const GetParam = {
        secNom: req.body.secNom,
        secDes: req.body.secDes,
    }

    const SeccionExist = await Seccion.findOne({ secNom: GetParam.secNom});

    if(SeccionExist!=undefined){
        console.log(SeccionExist);
        res.json({status: 510});
    }
    else{
        const newSeccion=new Seccion(GetParam);
        await newSeccion.save();   // se crea un nuevo registro en el documento  
        res.json({status: 200 });
    }
};

SeccionCtrl.editSeccion = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        secDes: req.body.secDes,
    }
    await Seccion.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status: 200 });
};

SeccionCtrl.deleteSeccion = async (req,res)=> {

    await Seccion.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = SeccionCtrl;