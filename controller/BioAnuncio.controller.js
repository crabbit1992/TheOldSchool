const BioAnuncio = require('../model/BioAnuncio');
const bioAnuncioCtrl = {};

bioAnuncioCtrl.getBioAnuncios = async (req, res) => {

    const GP={
        colCod: req.params.colCod,
    }

    const bioAnuncio = await BioAnuncio.find({ colCod: GP.colCod})
    .populate('imgCod');

    console.log(bioAnuncio);
    res.json(bioAnuncio); 
};


bioAnuncioCtrl.createBioAnuncio = async (req, res) => {
    const GP = {
        imgCod  : req.body.imgCod,
        colCod  : req.body.colCod  
    }

    const anunciosLength= await BioAnuncio.find({colCod: GP.colCod},async function(err,anuncio){

        if(anuncio.length<=11){
            const newBioAnuncio=new BioAnuncio(GP);
            await newBioAnuncio.save();   // se crea un nuevo registro en el documento  
            res.json({status: 200 });
        }
        else{
            res.json({status: 408, msg: "Error, solo se permiten tener 12 anuncios" });
            console.log("Error, solo se permiten tener 12 anuncios" )    
        }
    })


    /*
    const newBioAnuncio=new BioAnuncio(GP);
    await newBioAnuncio.save();   // se crea un nuevo registro en el documento  
    res.json({status: 200 });
    */
    
};

bioAnuncioCtrl.editBioAnuncio = async (req,res)=> {
    const {id}=req.params;
    const GP={
        imgCod: req.body.imgCod,
        colCod: req.body.colCod,
    }
    
    console.log(GP);
    await BioAnuncio.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200 });
    
};

bioAnuncioCtrl.deleteBioAnuncio = async (req,res)=> {
    await BioAnuncio.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = bioAnuncioCtrl;
