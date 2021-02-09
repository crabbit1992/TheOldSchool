const BioQuienesSomos = require('../model/BioQuienesSomos');
const bioQuienesSomosCtrl = {};

bioQuienesSomosCtrl.getBioQuienesSomos = async (req, res) => {

    const GP={
        colCod: req.params.colCod
    }
    console.log("entro");

    const bioQuienesSomos = await BioQuienesSomos.find({ colCod: GP.colCod})
    .populate('imgCod');
    res.json(bioQuienesSomos); 
};

bioQuienesSomosCtrl.createBioQuienesSomos = async (req, res) => {
    const GP = {
        qsTtl: req.body.qsTtl,
        qsDes: req.body.qsDes,
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    console.log(GP);

    
    const BioQuienesSomosExist = await BioQuienesSomos.findOne({ qsTtl: GP.qsTtl, colCod:GP.colCod});

    if(BioQuienesSomosExist!=undefined){
        console.log("BioQuienesSomosExist");
        res.json({status: 510 });
    }
    else{
        const newBioQuienesSomos=new BioQuienesSomos(GP);
        await newBioQuienesSomos.save();   // se crea un nuevo registro en el documento  
        res.json({status: 200 });
    }
};

bioQuienesSomosCtrl.editBioQuienesSomos = async (req,res)=> {
    const {id}=req.params;
    const GP={
        qsDes: req.body.qsDes,
        imgCod: req.body.imgCod,
    }
    console.log(GP);
    await BioQuienesSomos.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
};

bioQuienesSomosCtrl.deleteBioQuienesSomos = async (req,res)=> {

    await BioQuienesSomos.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioQuienesSomosCtrl;