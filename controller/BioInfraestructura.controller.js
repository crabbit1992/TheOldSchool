const BioInfraestructura = require('../model/BioInfraestructura');
const bioInfraestructura = {};

bioInfraestructura.getBioInfraestructura = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
        infTpo: req.params.infTpo
    }
    console.log(GP);

    const bioInfraestructura = await BioInfraestructura.find({ colCod: GP.colCod, infTpo: GP.infTpo})
    .populate('imgCod')
    .sort (  { "infTtl" :  1}  );

    res.json(bioInfraestructura); 
};

bioInfraestructura.getBioInfraestructuras = async (req, res) => {

    const GP={
        colCod: req.params.colCod
    }
    console.log(GP);

    const bioInfraestructura = await BioInfraestructura.find({ colCod: GP.colCod })
    .populate('imgCod')
    .sort (  { "infTtl" :  1}  );

    res.json(bioInfraestructura); 
};
 


bioInfraestructura.createBioInfraestructura = async (req, res) => {
    const GP = {
        infTpo  : req.body.infTpo,  
        infTtl  : req.body.infTtl,
        infDes  : req.body.infDes,
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    if(GP.infTpo=="1"){ // Donde infTpo 1 es igual a un encabezado
        const bioInfraestructura = await BioInfraestructura.findOne({ colCod: GP.colCod, infTpo: GP.infTpo})

        if(bioInfraestructura){
            console.log("Ya existe un encabezado");
            res.json({status: 510 });
        }
        else{
            const newBioInfraestructura=new BioInfraestructura(GP);
            await newBioInfraestructura.save();
            res.json({status: 200 });
        }
    }
    else{
            const newBioInfraestructura=new BioInfraestructura(GP);
            await newBioInfraestructura.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
    }
};

bioInfraestructura.editBioInfraestructura = async (req,res)=> {
    const {id}=req.params;
    const GP={
        infTtl: req.body.infTtl,
        infDes: req.body.infDes,
        imgCod: req.body.imgCod,
        colCod: req.body.colCod,
    }
    
    console.log("dfdss");
    console.log(GP);

    await BioInfraestructura.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

bioInfraestructura.deleteBioInfraestructura = async (req,res)=> {

    await BioInfraestructura.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioInfraestructura;
