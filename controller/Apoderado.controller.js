const Apoderado = require('../model/Apoderado');
const Perfil = require('../model/Perfiles');
const ApoderadoCtrl = {};

ApoderadoCtrl.getApoderadoCol = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
    }

    console.log(GetParam);
     
    const apoderado = await Apoderado.find({$and:[{ colCod: GetParam.colCod,estCod: "5e0a8a3b9644411040ebf292" }]})
    .populate('aluCod')
    .populate('perRepCod');
    
    console.log(GetParam);
    res.json(apoderado); 
};

ApoderadoCtrl.createApoderado = async (req, res) => {
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const apodExist = await Apoderado.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});
    if(apodExist!=undefined){
        console.log(apodExist);
        res.json({status:510});
    }
    else{
        const newApoderado=new Apoderado(GetParam);
        await newApoderado.save();   // se crea un nuevo registro en el documento

        var objperfil={     //Objeto que sera usado para crear el perfil
            perRepCod:newApoderado.perRepCod,
            codMiem:newApoderado._id,
            carCod:"5e0a91c3c2a58d0b8872b2c0", // asignar el codigo del cargo
            colCod:newApoderado.colCod,
        }
        const perfil=new Perfil(objperfil); 
    
        if(newApoderado!=undefined){  
            await perfil.save();  // se crea un nuevo registro en el documento perfil
        }
        res.json({status: 200 });
    }
};

ApoderadoCtrl.getApoderado = async (req, res) => {
    const apoderado= await Apoderado.findById(req.params.id);
    console.log(apoderado);
    res.json(apoderado); 
};

ApoderadoCtrl.editApoderado = async (req,res)=> {
    const {id}=req.params;
    const apoderado={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Apoderado.findByIdAndUpdate(id,{$set:apoderado});
    res.json({status: 200 });
};

ApoderadoCtrl.deleteApoderado = async (req,res)=> {

    await Apoderado.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = ApoderadoCtrl;