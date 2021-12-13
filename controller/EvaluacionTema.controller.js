const EvaluacionTema = require('../model/EvaluacionTema');
const Matricula = require('../model/Matricula');
const Periodo = require('../model/Periodo');


const EvaluacionTemaCtrl = {};

EvaluacionTemaCtrl.getEvaluacionTemas = async (req, res) => {

    const gp={
        temCod:  req.params.temCod,
        prdCod:  req.params.prdCod,
    }

    const evaluacionTema = await EvaluacionTema.find({temCod: gp.temCod, prdCod: gp.prdCod})
    .populate("perRepCod");
    res.json(evaluacionTema); 
};

EvaluacionTemaCtrl.getEvaTemAula = async (req, res) => {

    const gp={
        prdCod  :req.body.prdCod,
        graCod  :req.body.graCod,
        secCod  :req.body.secCod,
        nivCod  :req.body.nivCod,
        libCod  :req.body.libCod,
        temCod  :req.body.temCod,
    }

    const evaluacionTema = await EvaluacionTema.find({
        prdCod: gp.prdCod, 
        graCod: gp.graCod,
        secCod: gp.secCod, 
        nivCod: gp.nivCod,
        libCod: gp.libCod, 
        temCod: gp.temCod,
    })
    .populate("perRepCod");
    res.json(evaluacionTema); 
};

EvaluacionTemaCtrl.getEvaluacionTemaAlu = async (req, res) => {

    const gp={
        temCod:  req.params.temCod,
        prdCod:  req.params.prdCod,
        perRepCod:req.params.perRepCod,
    }

    const evaluacionTema = await EvaluacionTema.findOne({temCod: gp.temCod, prdCod: gp.prdCod, perRepCod: gp.perRepCod})
    .populate("perRepCod");
    res.json(evaluacionTema); 
};

EvaluacionTemaCtrl.createEvaluacionTema = async (req, res) => {

    const gp = {
        libCod      :req.body.libCod,
        temCod      :req.body.temCod,
        perRepCod   :req.body.perRepCod,
        evaTemNroIto:req.body.evaTemNroIto,
        evaTemNta   :req.body.evaTemNta,
        colCod      :req.body.colCod,
        prdCod      :req.body.prdCod,
        graCod      :req.body.graCod,
        secCod      :req.body.secCod,
        nivCod      :req.body.nivCod,
    }

    console.log("datos");
    console.log(gp);

    const periodos = await Periodo.find({colCod:gp.colCod});
    console.log(periodos);
    const ultPrd = periodos[periodos.length-1];
    console.log(ultPrd);
    const matricula= await Matricula.findOne({prdCod:ultPrd._id, perRepCod: gp.perRepCod});
    console.log(matricula);

    gp.prdCod=ultPrd._id;
    gp.graCod=matricula.graCod;
    gp.secCod=matricula.secCod;
    gp.nivCod=matricula.nivCod;

    console.log(gp);

    const evaTemaExist= await EvaluacionTema.findOne({temCod:gp.temCod, perRepCod: gp.perRepCod, prdCod: gp.prdCod});

        if(evaTemaExist){ 
            await EvaluacionTema.updateOne({_id:evaTemaExist._id},{$set:gp});
            res.json({status:200});
        }
        else{
            const newEvaluacionTema=new EvaluacionTema(gp);
            await newEvaluacionTema.save();   // se crea un nuevo registro en el documento  
            res.json({status:200});
        }
};



EvaluacionTemaCtrl.deleteEvaluacionTema = async (req,res)=> {
    
    const id=req.params.id;

  
    await EvaluacionTema.deleteOne({_id:id});
    res.json({status:200});

};

module.exports = EvaluacionTemaCtrl;