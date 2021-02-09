const Auxiliar = require('../model/Auxiliar');
const Alumno = require('../model/Alumno');
const Perfil = require('../model/Perfiles');
const AuxiliarCtrl = {};

AuxiliarCtrl.getAuxiliares = async (req, res) => {
    const auxiliar = await Auxiliar.find()
    .populate('perRepCod');
    console.log(auxiliar);
    res.json(auxiliar);
};

AuxiliarCtrl.createAuxiliar = async (req, res) => {
const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const auxiExist = await Auxiliar.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});
    /* const alumExist = await Alumno.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});

    if(alumExist!=undefined){
        console.log(alumExist);
        res.json({status:511});
    }
    else*/  if(auxiExist!=undefined){
        console.log(auxiExist);
        res.json({ status:510 });
    }
    else{
        const newAuxi=new Auxiliar(GetParam);
        await newAuxi.save();   // se crea un nuevo registro en el documento

        var objperfil={     //Objeto que sera usado para crear el perfil
            perRepCod:newAuxi.perRepCod,
            codMiem:newAuxi._id,
            carCod:"5e0a9191c2a58d0b8872b2bd", // asignar el codigo del cargo
            colCod:newAuxi.colCod,
        }
        const perfil=new Perfil(objperfil); 
    
        if(newAuxi!=undefined){  
            
            await perfil.save();  // se crea un nuevo registro en el documento perfil
        }
        res.json({ status: 200 }); 
    }
};

AuxiliarCtrl.getAuxiliar = async (req, res) => {
    const auxiliar= await Auxiliar.findById(req.params.id);
    console.log(auxiliar);
    res.json(auxiliar); 
};

AuxiliarCtrl.editAuxiliar = async (req,res)=> {
    const {id}=req.params;
    const auxiliar={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Auxiliar.findByIdAndUpdate(id,{$set:auxiliar});
    res.json({ status: 200 }); 
};

AuxiliarCtrl.deleteAuxiliar = async (req,res)=> {

    await Auxiliar.findByIdAndRemove(req.params.id);
    res.json({ status: 200 }); 
};

module.exports = AuxiliarCtrl;