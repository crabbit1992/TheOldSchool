const BioNivel = require('../model/BioNivel');
const bioNivelCtrl = {};

bioNivelCtrl.getBioNivel = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
        nivTpo: req.params.nivTpo
    }

    const bioNivel = await BioNivel.find({ colCod: GP.colCod, nivTpo: GP.nivTpo})
    .populate('imgCod')
    .sort (  { "nivTtl" :  1}  );

    res.json(bioNivel); 
};

bioNivelCtrl.getBioNivelAll = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
    }

    const bioNivel = await BioNivel.find({ colCod: GP.colCod})
    .populate('imgCod')
    .sort (  { "nivTtl" :  1}  );

    res.json(bioNivel); 
};

bioNivelCtrl.getBioNivelSgnNiv = async (req, res) => {

    console.log("Entro");
    const GP={
        colCod: req.params.colCod,
        nivTpo: req.params.nivTpo,
        nivTtl: req.params.nivTtl,
    }

    console.log(GP);

    const bioNivel = await BioNivel.find({ colCod: GP.colCod, nivTpo: GP.nivTpo, nivTtl:GP.nivTtl})
    .populate('imgCod')
    .sort (  { "nivTtl" :  1}  );

    res.json(bioNivel); 
};


bioNivelCtrl.createBioNivel = async (req, res) => {
    const GP = {
        nivTpo  : req.body.nivTpo,  
        nivTtl  : req.body.nivTtl,
        nivDes  : req.body.nivDes,
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    if(GP.nivTpo=="1"){ // Donde nivTpo 1 es igual a un encabezado
        const bioNivel = await BioNivel.findOne({ colCod: GP.colCod, nivTpo: GP.nivTpo, nivTtl: GP.nivTtl})

        if(bioNivel){
            console.log("Ya existe un encabezado");
            res.json({status: 510 });
        }
        else{
            const newBioNivel=new BioNivel(GP);
            await newBioNivel.save();
            res.json({status: 200 });
        }
    }
    else{
            const newBioNivel=new BioNivel(GP);
            await newBioNivel.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
    }
};

bioNivelCtrl.editBioNivel = async (req,res)=> {
    const {id}=req.params;
    const GP={
        nivTtl: req.body.nivTtl,
        nivDes: req.body.nivDes,
        imgCod: req.body.imgCod,
        colCod: req.body.colCod,
    }
    
    console.log("dfdss");
    console.log(GP);

    await BioNivel.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

bioNivelCtrl.deleteBioNivel = async (req,res)=> {

    await BioNivel.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioNivelCtrl;
