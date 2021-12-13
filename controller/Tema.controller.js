const Tema = require('../model/Tema');
const TemaCtrl = {};

TemaCtrl.getTemas = async (req, res) => {

    const gp={
        libCod:  req.params.libCod,
    }

    const tema = await Tema.find({libCod: gp.libCod})
    .sort (  { "nroOrd" :  1 }  );
    res.json(tema); 
};

TemaCtrl.createTema = async (req, res) => {
    const gp = {
        nroOrd:req.body.nroOrd,
        libCod:req.body.libCod,
        temTtl:req.body.temTtl,
        temDes:req.body.temDes,
        temEvaTim:req.body.temEvaTim,
        colCod:req.body.colCod,
    }

    const temaExist= await Tema.findOne({temTtl:gp.temTtl, libCod:gp.libCod});

        if(temaExist){
            res.json({status: 510 }); //Ya hay un tema con este titulo
        }
        else{
            const newTema=new Tema(gp);
            await newTema.save();   // se crea un nuevo registro en el documento  
            res.json({status:200});
        }
    
};

TemaCtrl.editTema = async (req,res)=> {
    const {id}=req.params;
    const gp={
        nroOrd:req.body.nroOrd,
        libCod:req.body.libCod,
        temTtl:req.body.temTtl,
        temDes:req.body.temDes,
        temEvaTim:req.body.temEvaTim,
    }

    const temaExist= await Tema.findOne({temTtl:gp.temTtl, libCod:gp.libCod});

    if(temaExist){

        if(temaExist._id==id){

            await Tema.findByIdAndUpdate(id,{$set:gp});
            res.json({status:200 }); 
        }
        else{
            res.json({status: 510 }); //Ya hay un tema con este titulo
        }
  
    }
    else{
        await Tema.findByIdAndUpdate(id,{$set:gp});
        res.json({status:200 }); 
    }
    
};

TemaCtrl.deleteTema = async (req,res)=> {
    var _id=req.params.id

    const EstadoDeshabilitado={
        estCod:'5e0a8a479644411040ebf293', //id del documento estado que se refiere a deshabilitar
    }

    await Tema.updateOne({_id:_id},{$set:EstadoDeshabilitado});
    res.json({status:200});
};

/*********** referente a evaluacion del tema ********************************** */
TemaCtrl.addEvaTema = async (req, res) => {

    var _id=req.params.id       //id del tema

    const gp = {
        codEva:    req.body.codEva,
        codtpoNta: req.body.codtpoNta,
        evaluable: req.body.evaluable,
        tiempo:    req.body.tiempo,
    }

    await Tema.updateOne({_id:_id},{$set: { temEva: gp } });
    res.json({status:200});
}; 

TemaCtrl.deleteEvaTema = async (req, res) => {

    var _id=req.params.id       //id del tema

    await Tema.updateOne({_id:_id},{$set: { temEva: null } });
    res.json({status:200});
};



module.exports = TemaCtrl;
