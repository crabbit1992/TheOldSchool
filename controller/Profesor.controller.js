const Profesor = require('../model/Profesor');
const Alumno = require('../model/Alumno');
const Perfil = require('../model/Perfiles');
const ProfesorCtrl = {};

ProfesorCtrl.getProfesoresCol = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
    }
    console.log("ssss");
    const profesor = await Profesor.find({$and:[{ colCod: GetParam.colCod,estCod: "5e0a8a3b9644411040ebf292" }]})
    .populate('aluCod')
    .populate('perRepCod');
    
    console.log(profesor.length);
    res.json(profesor); 
};

ProfesorCtrl.createProfesor = async (req, res) => {
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const profExist = await Profesor.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});
    
    if(profExist!=undefined){
        console.log(profExist);
        res.json({status:510});
    }
    else{
        const newProfesor=new Profesor(GetParam);
        await newProfesor.save();   // se crea un nuevo registro en el documento

        var objperfil={     //Objeto que sera usado para crear el perfil
            perRepCod:newProfesor.perRepCod,
            codMiem:newProfesor._id,
            carCod:"5e0a9197c2a58d0b8872b2be", // asignar el codigo del cargo
            colCod:newProfesor.colCod,
        }
        const perfil=new Perfil(objperfil); 
    
        if(newProfesor!=undefined){  
            await perfil.save();  // se crea un nuevo registro en el documento perfil
        }
        res.json({status: 200 });
    }
};

ProfesorCtrl.getProfesor = async (req, res) => {
    const profesor= await Profesor.findById(req.params.id);
    console.log(profesor);
    res.json(profesor); 
};

ProfesorCtrl.editProfesor = async (req,res)=> {
    const {id}=req.params;
    const profesor={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Profesor.findByIdAndUpdate(id,{$set:profesor});
    res.json({status: 200 });
};

ProfesorCtrl.deleteProfesor = async (req,res)=> {

    await Profesor.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = ProfesorCtrl;