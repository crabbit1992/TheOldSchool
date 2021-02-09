const Director = require('../model/Director');
const Perfil = require('../model/Perfiles');
const Alumno = require('../model/Alumno');
const DirectorCtrl = {};

DirectorCtrl.getDirectores = async (req, res) => {
    const director = await Director.find();
    console.log(director);
    res.json(director);
};

DirectorCtrl.createDirector = async (req, res) => {
    
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    console.log(GetParam);
    const dirExist = await Director.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});

    console.log(dirExist);
    if(dirExist!=undefined || dirExist!=null){
        res.json({ status: 510 }); 
    }
    else{
        
        let perfilHabilitado= await Perfil.findOne({$and:[{
                carCod: "5e0a916dc2a58d0b8872b2b9",
                estCod: "5e0a8a3b9644411040ebf292", // Codigo de estado "Habilitado"
                colCod:  GetParam.colCod,
            }]});

        if(perfilHabilitado!=undefined){
            console.log("Se encontro un perfil habilitado");
            res.json({ status: 523 }); 
        }else{
           
            const newDirector=new Director(GetParam);
            await newDirector.save();   // se crea un nuevo registro en el documento

            var objperfil={     //Objeto que sera usado para crear el perfil
                perRepCod:newDirector.perRepCod,
                codMiem:newDirector._id,
                carCod:"5e0a916dc2a58d0b8872b2b9", // asignar el codigo del cargo
                colCod:newDirector.colCod,
            }
            
            const perfil=new Perfil(objperfil); 
        
            if(newDirector!=undefined){  
                await perfil.save();  // se crea un nuevo registro en el documento perfil
            }
            res.json({ status: 200 }); 
        }
    }  
};

DirectorCtrl.getDirector = async (req, res) => {
    const director= await Director.findById(req.params.id);
    console.log(director);
    res.json(director); 
};

DirectorCtrl.editDirector = async (req,res)=> {
    const {id}=req.params;
    const director={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Director.findByIdAndUpdate(id,{$set:director});
    res.json({ status: 200 }); 
};

DirectorCtrl.deleteDirector = async (req,res)=> {

    await Director.findByIdAndRemove(req.params.id);
    res.json({ status: 200 }); 
};
module.exports = DirectorCtrl;