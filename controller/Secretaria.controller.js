const Secretaria = require('../model/Secretaria');
const Perfil = require('../model/Perfiles');
const SecretariaCtrl = {};

SecretariaCtrl.getSecretariaCol = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
    }

    console.log(GetParam);
     
    const secretaria = await Secretaria.find({$and:[{ colCod: GetParam.colCod,estCod: "5e0a8a3b9644411040ebf292" }]})
    .populate('aluCod')
    .populate('perRepCod');
    
    console.log(GetParam);
    res.json(secretaria); 
};

SecretariaCtrl.createSecretaria = async (req, res) => {
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const profExist = await Secretaria.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});
    if(profExist!=undefined){
        console.log(profExist);
        res.json({status:510});
    }
    else{
        const newSecretaria=new Secretaria(GetParam);
        await newSecretaria.save();   // se crea un nuevo registro en el documento

        var objperfil={     //Objeto que sera usado para crear el perfil
            perRepCod:newSecretaria.perRepCod,
            codMiem:newSecretaria._id,
            carCod:"5e0a918cc2a58d0b8872b2bc", // asignar el codigo del cargo
            colCod:newSecretaria.colCod,
        }
        const perfil=new Perfil(objperfil); 
    
        if(newSecretaria!=undefined){  
            await perfil.save();  // se crea un nuevo registro en el documento perfil
        }
        res.json({status: 200 });
    }
};

SecretariaCtrl.getSecretaria = async (req, res) => {
    const secretaria= await Secretaria.findById(req.params.id);
    console.log(secretaria);
    res.json(secretaria); 
};

SecretariaCtrl.editSecretaria = async (req,res)=> {
    const {id}=req.params;
    const secretaria={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Secretaria.findByIdAndUpdate(id,{$set:secretaria});
    res.json({status: 200 });
};

SecretariaCtrl.deleteSecretaria = async (req,res)=> {

    await Secretaria.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = SecretariaCtrl;