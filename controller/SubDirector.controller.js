const SubDirector = require('../model/SubDirector');
const Alumno = require('../model/Alumno');
const Perfil = require('../model/Perfiles');
const SubDirectorCtrl = {};

SubDirectorCtrl.getSubDirectores = async (req, res) => {
    const subDirector = await SubDirector.find();
    console.log(subDirector);
    res.json(subDirector);
};

SubDirectorCtrl.createSubDirector = async (req, res) => {
    
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }
    const sdirExist = await SubDirector.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});
    if(sdirExist!=undefined){
        console.log(sdirExist);
        res.json({ status: 510 });
    }
    else{

        let perfilHabilitado= await Perfil.findOne({$and:[{ 
            carCod: "5e0a9176c2a58d0b8872b2ba",
            estCod: "5e0a8a3b9644411040ebf292", // Codigo de estado "Habilitado"
            colCod:  GetParam.colCod
        }]});
        console.log(perfilHabilitado);
        if(perfilHabilitado!=undefined){
            console.log("Se encontro un perfil habilitadoooo");
            res.json({ status: 523 }); 
        }else{
            
            const newSubdir=new SubDirector(GetParam);
            await newSubdir.save();   // se crea un nuevo registro en el documento
    
            var objperfil={     //Objeto que sera usado para crear el perfil
                perRepCod:newSubdir.perRepCod,
                codMiem:newSubdir._id,
                carCod:"5e0a9176c2a58d0b8872b2ba", // asignar el codigo del cargo
                colCod:newSubdir.colCod,
            }
            const perfil=new Perfil(objperfil); 
        
            if(newSubdir!=undefined){   
                await perfil.save();  // se crea un nuevo registro en el documento perfil
            }
            res.json({ status: 200 });
        }
    }
};

SubDirectorCtrl.getSubDirector = async (req, res) => {
    const subDirector= await SubDirector.findById(req.params.id);
    console.log(subDirector);
    res.json(subDirector); 
};

SubDirectorCtrl.editSubDirector = async (req,res)=> {
    const {id}=req.params;
    const subDirector={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await SubDirector.findByIdAndUpdate(id,{$set:subDirector});
    res.json({ status: 200 });
};

SubDirectorCtrl.deleteSubDirector = async (req,res)=> {

    await SubDirector.findByIdAndRemove(req.params.id);
    res.json({ status: 200 });
};

module.exports = SubDirectorCtrl;