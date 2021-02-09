const BioTaller = require('../model/BioTaller');
const bioTallerCtrl = {};

bioTallerCtrl.getBioTaller = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
        talTpo: req.params.talTpo
    }

    const bioTaller = await BioTaller.find({ colCod: GP.colCod, talTpo: GP.talTpo})
    .populate('imgCod')
    .sort (  { "talTtl" :  1}  );

    res.json(bioTaller); 
};

bioTallerCtrl.getBioTalleres = async (req, res) => {

    const GP={
        colCod: req.params.colCod
    }

    const bioTaller = await BioTaller.find({ colCod: GP.colCod})
    .populate('imgCod')
    .sort (  { "talTtl" :  1}  );

    res.json(bioTaller); 
};



bioTallerCtrl.createBioTaller = async (req, res) => {
    const GP = {
        talTpo  : req.body.talTpo,  
        talTtl  : req.body.talTtl,
        talDes  : req.body.talDes,
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    if(GP.talTpo=="1"){ // Donde talTpo 1 es igual a un encabezado
        const bioTaller = await BioTaller.findOne({ colCod: GP.colCod, talTpo: GP.talTpo})

        if(bioTaller){
            console.log("Ya existe un encabezado");
            res.json({status: 510 });
        }
        else{
            const newBioTaller=new BioTaller(GP);
            await newBioTaller.save();
            res.json({status: 200 });
        }
    }
    else{
            const newBioTaller=new BioTaller(GP);
            await newBioTaller.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
    }
};

bioTallerCtrl.editBioTaller = async (req,res)=> {
    const {id}=req.params;
    const GP={
        talTtl: req.body.talTtl,
        talDes: req.body.talDes,
        imgCod: req.body.imgCod,
        colCod: req.body.colCod,
    }
    
    console.log("dfdss");
    console.log(GP);

    await BioTaller.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

bioTallerCtrl.deleteBioTaller = async (req,res)=> {

    await BioTaller.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioTallerCtrl;
