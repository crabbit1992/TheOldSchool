const Evaluacion = require('../model/Evaluacion');
const EvaluacionAdm = require('../model/EvaluacionAdm');
const EvaluacionCtrl = {};

EvaluacionCtrl.getEvaluaciones = async (req, res) => {

    const gp={
        libCod:  req.params.libCod,
        temCod:  req.params.temCod,
    }

    const evaluacion = await Evaluacion.find({libCod: gp.libCod, temCod: gp.temCod})
    res.json(evaluacion); 
};

EvaluacionCtrl.getEvaluacionesHbl = async (req, res) => {

    const gp={
        libCod:  req.params.libCod,
        temCod:  req.params.temCod,
    }

    const evaluacion = await Evaluacion.find({libCod: gp.libCod, temCod: gp.temCod, estCod: "5e0a8a3b9644411040ebf292"})
    res.json(evaluacion); 
};


EvaluacionCtrl.createEvaluacion = async (req, res) => {
    const gp = {
        evaPta:     req.body.evaPta,        //pregunta 
        evaRpt:     req.body.evaRpt,        //array respuestas 
        imgCod:     req.body.imgCod,        //imagen 
        evaOpc:     req.body.evaOpc,        //array opciones 
        evaPtsEqt:  req.body.evaPtsEqt,     //puntos equivalentes 
        libCod:     req.body.libCod,        //id libro
        temCod:     req.body.temCod,        //id tema
        colCod:     req.body.colCod,        //id colegio
    }

    const evaAdm = await EvaluacionAdm.find({temCod:gp.temCod, libCod:gp.libCod});

    if(evaAdm==0){

        objEvaAdm = {
            libCod: gp.libCod,
            temCod: gp.temCod,
            colCod: gp.colCod
        }

        const newEvaluacionAdm=new EvaluacionAdm(objEvaAdm);
        await newEvaluacionAdm.save();   // se crea un nuevo registro en el documento  
    }

    const evaExist = await Evaluacion.findOne({temCod:gp.temCod, evaPta:gp.evaPta});

    if(evaExist){
        res.json({status: 510 }); //Ya hay un evaluacion con esta pregunta
    }
    else{
        const newEvaluacion=new Evaluacion(gp);
        await newEvaluacion.save();   // se crea un nuevo registro en el documento  
        res.json({status:200});
    }
    
};

EvaluacionCtrl.editEvaluacion = async (req,res)=> {
    const {id}=req.params;
    
    const gp = {
        evaPta:     req.body.evaPta,        //pregunta 
        evaRpt:     req.body.evaRpt,        //array respuestas 
        imgCod:     req.body.imgCod,        //imagen 
        evaOpc:     req.body.evaOpc,        //array opciones 
        evaPtsEqt:  req.body.evaPtsEqt,     //puntos equivalentes 
    }

    const evaExist= await Evaluacion.findOne({temCod:gp.temCod, evaPta:gp.evaPta});

    if(evaExist){

        if(evaExist._id==id){

            await Evaluacion.findByIdAndUpdate(id,{$set:gp});
            res.json({status:200 }); 
        }
        else{
            res.json({status: 510 }); //Ya hay un evaluacion con este titulo
        }
  
    }
    else{
        await Evaluacion.findByIdAndUpdate(id,{$set:gp});
        res.json({status:200 }); 
    }
    
};

EvaluacionCtrl.deleteEvaluacion = async (req,res)=> {
    var _id=req.params.id

    const EstadoDeshabilitado={
        estCod:'5e0a8a479644411040ebf293', //id del documento estado que se refiere a deshabilitar
    }

    await Evaluacion.updateOne({_id:_id},{$set:EstadoDeshabilitado});
    res.json({status:200});
};

module.exports = EvaluacionCtrl;
