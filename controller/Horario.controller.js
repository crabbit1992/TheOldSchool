const Horario = require('../model/Horario');
const IntervaloHorario = require('../model/IntervaloHorario');
const HorarioCtrl = {};

HorarioCtrl.getHorario = async (req, res) => {
    console.log("Entro  al horario");
    GP={
        alvCod:req.params.alvCod,
        colCod:req.params.colCod
    }

    var horarioJson=[];

    var arrayHorario={
        itvHroCod:{},
        lunes:{},
        martes:{},
        miercoles:{},
        jueves:{},
        viernes:{},
        sabado:{},
        domingo:{},
    };

    const itvHro = await IntervaloHorario.find({colCod: GP.colCod}).sort('intHraIni');
    const horario = await Horario.find({alvCod: GP.alvCod}).populate('curCod');
  

    var dia="";
    var curso=""
    var itvHroCod="";

    const tamañoItvhro= itvHro.length;

    for(var i=0;i<itvHro.length;i++){

        itvHroCod=itvHro[i]._id;

        arrayHorario={
            itvHroCod:{
                _id         : itvHro[i]._id,
                intHraIni	: itvHro[i].intHraIni,
                intHraFin	: itvHro[i].intHraFin,
            }
        }

        for(var u=0;u<horario.length;u++){

                if(itvHro[i]._id.toString()==horario[u].itvHroCod._id.toString()){
                    dia=horario[u].hroDia;
                    curso=horario[u].curCod;
                    if(dia=="Lunes"){
                        arrayHorario.lunes=curso;
                    }
                    else if(dia=="Martes"){
                        arrayHorario.martes=curso;
                    }
                    else if(dia=="Miercoles"){
                        arrayHorario.miercoles=curso;
                    }
                    else if(dia=="Jueves"){
                        arrayHorario.jueves=curso;
                    }
                    else if(dia=="Viernes"){
                        arrayHorario.viernes=curso;
                    }
                    else if(dia=="Sabado"){
                        arrayHorario.sabado=curso;
                    }
                }  
            
        }

        if(arrayHorario.lunes==undefined){
            arrayHorario.lunes={
                _id:"string",
                ncoCurNom:"Sin definir",
            };
        }
        if(arrayHorario.martes==undefined){
            arrayHorario.martes={
                _id:"string",
                ncoCurNom:"Sin definir",
            };
        }
        if(arrayHorario.miercoles==undefined){
            arrayHorario.miercoles={
                _id:"string",
                ncoCurNom:"Sin definir",
            };
        }
        if(arrayHorario.jueves==undefined){
            arrayHorario.jueves={
                _id:"string",
                ncoCurNom:"Sin definir",
            };
        }
        if(arrayHorario.viernes==undefined){
            arrayHorario.viernes={
                _id:"string",
                ncoCurNom:"Sin definir",
            };
        }
        if(arrayHorario.sabado==undefined){
            arrayHorario.sabado={
                _id:"string",
                ncoCurNom:"Sin definir",
            };
        }
        horarioJson.push(arrayHorario);
    }

    res.json(horarioJson);
};

HorarioCtrl.createHorario = async (req, res) => {

    const GP = {
        curCod: req.body.curCod,
        hroDia: req.body.hroDia,
        itvHroCod: req.body.itvHroCod,
        alvCod: req.body.alvCod,
        colCod: req.body.colCod,
    }

    const HorarioExist = await Horario.findOne({$and:[{
        alvCod: GP.alvCod,
        itvHroCod: GP.itvHroCod,
        hroDia: GP.hroDia
    }]});

    if(HorarioExist!=undefined){
        res.json({status:510}); //Ya existe un curso en este horario
    }
    else{
        const newHorario=new Horario(GP);
        await newHorario.save();   // se crea un nuevo registro en el documento  
        res.json({status:200});
    }
    
};

HorarioCtrl.editHorario = async (req,res)=> {

   

    console.log("Entro a editar horario");
    const GP = {
        curCod: req.body.curCod,
        hroDia: req.body.hroDia,
        itvHroCod: req.body.itvHroCod,
        alvCod: req.body.alvCod,
        colCod: req.body.colCod,
    }

    console.log(GP);
    const horario = await Horario.findOne({
 
        hroDia      : GP.hroDia,
        itvHroCod   : GP.itvHroCod,
        alvCod      : GP.alvCod
    })
    .populate('curCod');

    console.log(horario);
    
    await Horario.findByIdAndUpdate(horario._id,{$set:GP});
    res.json({status:200});
    
};

HorarioCtrl.deleteHorario = async (req,res)=> {

    console.log("Entro a eliminar horario");
    const GP = {
        hroDia: req.body.hroDia,
        itvHroCod: req.body.itvHroCod,
        alvCod: req.body.alvCod,
    }

    const horario = await Horario.findOne({
 
        hroDia      : GP.hroDia,
        itvHroCod   : GP.itvHroCod,
        alvCod      : GP.alvCod
    })

    await Horario.findByIdAndRemove(horario._id);
    res.json({status:200});
};

module.exports = HorarioCtrl;