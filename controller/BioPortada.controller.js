const BioPortada = require('../model/BioPortada');
const Colegio = require('../model/Colegio');
const bioPortadaCtrl = {};

bioPortadaCtrl.getBioPortadas = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
    }

    const bioPortada = await BioPortada.find({ colCod: GP.colCod})
    .populate('imgCod');

    res.json(bioPortada); 
};

bioPortadaCtrl.getBioPortadasUrl = async (req, res) => {

    const GP={
        colUrl: req.params.colUrl,
    }

    const colegio=await Colegio.findOne({colUrl: GP.colUrl});

    const bioPortada = await BioPortada.find({ colCod: colegio._id})
    .populate('imgCod');

    res.json(bioPortada); 
};

bioPortadaCtrl.createBioPortada = async (req, res) => {
    const GP = {
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    const portadasLength= await BioPortada.find({colCod: GP.colCod},async function(err,portada){

        if(portada.length<=11){
            const newBioPortada=new BioPortada(GP);
            await newBioPortada.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
        }
        else{
            res.json({status: 408, msg: "Error, solo se permiten tener 12 portadas" });
            console.log("Error, solo se permiten tener 12 portadas" )    
        }
    })
    
};

bioPortadaCtrl.editBioPortada = async (req,res)=> {
    const {id}=req.params;
    const GP={
        imgCod: req.body.imgCod,
        colCod: req.body.colCod,
    }
    
    console.log(GP);
    await BioPortada.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

bioPortadaCtrl.deleteBioPortada = async (req,res)=> {
    await BioPortada.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioPortadaCtrl;
