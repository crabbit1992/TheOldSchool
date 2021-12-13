const EvaluacionAdm = require('../model/EvaluacionAdm');
const EvaluacionAdmCtrl = {};

EvaluacionAdmCtrl.getEvaAdm = async (req, res) => {

    const gp={
        libCod:  req.params.libCod,
        temCod:  req.params.temCod,
    }

    console.log(gp);

    const evaAdm= await EvaluacionAdm.findOne({libCod: gp.libCod, temCod: gp.temCod})
    .populate("libCod")
    .populate("temCod")
    res.json(evaAdm); 
};


EvaluacionAdmCtrl.editEvaAdm = async (req,res)=> {
    const {id}=req.params;
    
    const gp = {
        evaTim:     req.body.evaTim,        
        evaNroIts:     req.body.evaNroIts
    }

    await EvaluacionAdm.findByIdAndUpdate(id,{$set:gp});
    res.json({status:200 }); 

};


module.exports = EvaluacionAdmCtrl;