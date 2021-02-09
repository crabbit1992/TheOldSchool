const Alumno = require('../model/Alumno');
const Apoderado = require('../model/Apoderado');
const Perfil = require('../model/Perfiles');
const AlumnoCtrl = {};

AlumnoCtrl.getAlumnos = async (req, res) => {
    const alumno = await Alumno.find()
    .populate('perRepCod')
    .populate('colCod')
    console.log(alumno);
    res.json(alumno);
}; 

AlumnoCtrl.getAlumnosColegio = async (req, res) => {

    const GetParam = {
        colCod: req.params.colCod,
    }
    const alumnos = await Alumno.find({colCod: GetParam.colCod,estCod: "5e0a8a3b9644411040ebf292"})
    .populate('perRepCod')
    console.log("Cantidad de alumnos: " + alumnos.length);
    res.json(alumnos);
};

AlumnoCtrl.getAlumnosApoderado = async (req, res) => {

    const GetParam = {
        colCod: req.params.colCod,
        perRepCod: req.params.perRepCod,
        apoCod: "",
    }

    console.log(GetParam);
    GetParam.apoCod= await Apoderado.find({perRepCod:GetParam.perRepCod, colCod:GetParam.colCod})

    
    const alumnos = await Alumno.find({colCod: GetParam.colCod, apoCod: GetParam.apoCod})
    .populate('perRepCod')
    console.log(GetParam);
    res.json(alumnos);
    
};


AlumnoCtrl.DeleteApoderado = async (req, res) => {

    
    const aluCod= req.params.aluCod
 

    const alumno={
        apoCod: null
    }
    await Alumno.findByIdAndUpdate(aluCod,{$set:alumno});
    res.json({status: 200 }); 
    //aqui me quede
    
};




AlumnoCtrl.AsignarApoderado = async (req, res) => {
    console.log("esntrooaaaa");
    const GetParam = {
        aluCod: req.body.aluCod,
        apoCod: req.body.apoCod,
    }

    console.log(GetParam.apoCod);

    const _idAlumno= GetParam.aluCod;

    const alumno={
        apoCod:req.body.apoCod,
    }
    const res_alumno=await Alumno.findByIdAndUpdate(_idAlumno,{$set:alumno});
    console.log(res_alumno);
    res.json(res_alumno); 

};


AlumnoCtrl.createAlumno = async (req, res) => {
    const GetParam = {
        perRepCod: req.body.perRepCod,
        colCod: req.body.colCod,
    }

    const alumFullExist = await Alumno.findOne({perRepCod: GetParam.perRepCod, estCod: "5e0a8a3b9644411040ebf292"});
    const alumExist = await Alumno.findOne({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod});

    
    if(alumExist!=undefined){  // Es alumno en este colegio
        console.log(alumExist);
        res.json({status: 510 });
    }
    else if(alumFullExist!=undefined){   // Es alumno en otro colegio
        res.json({status: 509 }); 
        console.log("Es alumno en otro colegio");

    }
    else{


        const newAlum=new Alumno(GetParam);
        await newAlum.save();   // se crea un nuevo registro en el documento

        var objperfil={     //Objeto que sera usado para crear el perfil
            perRepCod:newAlum.perRepCod,
            codMiem:newAlum._id,
            carCod:"5e0a91bbc2a58d0b8872b2bf", // asignar el codigo del cargo
            colCod:newAlum.colCod,
        }
        const perfil=new Perfil(objperfil); 
    
        if(newAlum!=undefined){  
            
            await perfil.save();  // se crea un nuevo registro en el documento perfil
        }
        res.json({status: 200 }); 
    }
};

AlumnoCtrl.getAlumno = async (req, res) => {
    const alumno= await Alumno.findById(req.params.id);
    console.log(alumno);
    res.json(alumno); 
};

AlumnoCtrl.editAlumno = async (req,res)=> {
    const {id}=req.params;
    const alumno={
        perCod:req.body.perCod,
        colCod:req.body.colCod,
    }
    await Alumno.findByIdAndUpdate(id,{$set:alumno});
    res.json({status: 200 }); 
};

AlumnoCtrl.deleteAlumno = async (req,res)=> {

    await Alumno.findByIdAndRemove(req.params.id);
    res.json({status: 200 }); 
};

module.exports = AlumnoCtrl;