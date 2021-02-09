const Administrador = require('../model/Administrador');
const Alumno = require('../model/Alumno');
const Perfil = require('../model/Perfiles');

const AdministradorCtrl = {};

AdministradorCtrl.getAdministradores = async (req, res) => {
    const administrador = await Administrador.find()
    .populate('perRepCod');
    console.log(administrador);
    res.json(administrador);
};

AdministradorCtrl.createAdministrador = async (req, res) => {

    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const admExist = await Administrador.findOne({colCod: GetParam.colCod});
    /* const alumExist = await Alumno.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});

    if(alumExist!=undefined){
        console.log(alumExist);
        res.json({status:511});
    }
    else*/  if(admExist!=undefined){
        console.log(admExist);
        res.json({status:510});
    }
    else{
        const newAdmin=new Administrador(GetParam);
        await newAdmin.save();   // se crea un nuevo registro en el documento

        var objperfil={     //Objeto que sera usado para crear el perfil
            perRepCod:newAdmin.perRepCod,
            codMiem:newAdmin._id,
            carCod:"5e0a9164c2a58d0b8872b2b8", // asignar el codigo del cargo
            colCod:newAdmin.colCod,
        }
        const perfil=new Perfil(objperfil); 
    
        if(newAdmin!=undefined){  
            
            await perfil.save();  // se crea un nuevo registro en el documento perfil
        }
        res.json({status: 200 });
    }
};

AdministradorCtrl.getAdministrador = async (req, res) => {
    const administrador= await Administrador.findById(req.params.id);
    console.log(administrador);
    res.json(administrador); 
};

AdministradorCtrl.editAdministrador = async (req,res)=> {
    const {id}=req.params;
    const administrador={
        perRepCod:req.body.perRepCod,
        colCod:req.body.colCod,
    }
    console.log(administrador);
    console.log(id);


    const adm=await Administrador.findOne({colCod: administrador.colCod})

    await Administrador.update({colCod: administrador.colCod},{$set:administrador}); //actualiza la tabla de administradores

    const pflAdminCol= await Perfil.findOne({colCod: administrador.colCod, carCod: "5e0a9164c2a58d0b8872b2b8"});

    const perfil={
        perRepCod:req.body.perRepCod,
        codMiem:adm._id,
        colCod:req.body.colCod,
    };

    await Perfil.update({_id:pflAdminCol._id},{$set:perfil}); //actualiza la tabla de perfiles del colegio

    res.json({status: 200 });
};

AdministradorCtrl.deleteAdministrador = async (req,res)=> {

    await Administrador.findByIdAndRemove(req.params.id);
    res.json({status: 200});
};

module.exports = AdministradorCtrl;