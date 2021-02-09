const Coordinador = require('../model/Coordinador');
const Perfil = require('../model/Perfiles');
const CoordinadorCtrl = {};

CoordinadorCtrl.getCoordinadores = async (req, res) => {
    const coordinador = await Coordinador.find();
    console.log(coordinador);
    res.json(coordinador);
};

CoordinadorCtrl.createCoordinador = async (req, res) => {
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const coordExist = await Coordinador.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});
    
    if(coordExist!=undefined){
        console.log(coordExist);
        res.json({ status: 510 });
    }
    else{

        let perfilHabilitado= await Perfil.findOne({$and:[{ 
            carCod: "5e0a917ec2a58d0b8872b2bb",
            estCod: "5e0a8a3b9644411040ebf292", // Codigo de estado "Habilitado"
            colCod:  GetParam.colCod,
        }]});

        if(perfilHabilitado!=undefined){
            console.log("Se encontro un perfil habilitado");
            res.json({ status: 523 }); 
        }else{

            const newCoord=new Coordinador(GetParam);
            await newCoord.save();   // se crea un nuevo registro en el documento
    
            var objperfil={     //Objeto que sera usado para crear el perfil
                perRepCod:newCoord.perRepCod,
                codMiem:newCoord._id,
                carCod:"5e0a917ec2a58d0b8872b2bb", // asignar el codigo del cargo
                colCod:newCoord.colCod,
            }
            const perfil=new Perfil(objperfil); 
        
            if(newCoord!=undefined){  
                
                await perfil.save();  // se crea un nuevo registro en el documento perfil
            }
            res.json({ status: 200 });

        }   
    }
};

CoordinadorCtrl.getCoordinador = async (req, res) => {
    const coordinador= await Coordinador.findById(req.params.id);
    console.log(coordinador);
    res.json(coordinador); 
};

CoordinadorCtrl.editCoordinador = async (req,res)=> {
    const {id}=req.params;
    const coordinador={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Coordinador.findByIdAndUpdate(id,{$set:coordinador});
    res.json({status: 200 });
};

CoordinadorCtrl.deleteCoordinador = async (req,res)=> {

    await Coordinador.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = CoordinadorCtrl;