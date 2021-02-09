const BioActividad = require('../model/BioActividad');
const bioActividadCtrl = {};

bioActividadCtrl.getBioActividad = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
        actTpo: req.params.actTpo
    }
    console.log(GP);

    const bioActividad = await BioActividad.find({ colCod: GP.colCod, actTpo: GP.actTpo})
    .populate('imgCod');
    console.log(bioActividad);
    res.json(bioActividad); 
};

bioActividadCtrl.getBioActividades = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
    }

    const bioActividad = await BioActividad.find({ colCod: GP.colCod})
    .populate('imgCod');
    console.log(bioActividad);
    res.json(bioActividad); 

};

bioActividadCtrl.createBioActividad = async (req, res) => {
    const GP = {
        actTpo  : req.body.actTpo,
        actTtl  : req.body.actTtl,
        actDes  : req.body.actDes,
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    if(GP.actTpo=="1"){ // Donde infTpo 1 es igual a un encabezado
        const BioActividadExist = await BioActividad.findOne({ colCod: GP.colCod, actTpo: GP.actTpo})

        if(BioActividadExist){
            console.log("Ya existe un encabezado");
            res.json({status: 510 });
        }
        else{
            const newBioActividad=new BioActividad(GP);
            await newBioActividad.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
        }
    }
    else{
            const newBioActividad=new BioActividad(GP);
            await newBioActividad.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
    }




};

bioActividadCtrl.editBioActividad = async (req,res)=> {
    const {id}=req.params;
    const GP={
        actTtl: req.body.actTtl,
        actDes: req.body.actDes,
        imgCod: req.body.imgCod,
        colCod: req.body.colCod,
    }

    await BioActividad.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

bioActividadCtrl.deleteBioActividad = async (req,res)=> {

    await BioActividad.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioActividadCtrl;