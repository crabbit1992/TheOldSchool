const TipoImagen = require('../model/TipoImagen');
const TipoImagenCtrl = {};

TipoImagenCtrl.getTipoImagenes = async (req, res) => {
    const tipoImagen = await TipoImagen.find();
    res.json(tipoImagen);
};

TipoImagenCtrl.createTipoImagen = async (req, res) => {
    const tipoImagen=new  TipoImagen(req.body);
    await tipoImagen.save();
    res.json({status: 200 });
};

TipoImagenCtrl.getTipoImagen = async (req, res) => {
    const tipoImagen= await TipoImagen.findById(req.params.id);
    res.json(tipoImagen); 
};

TipoImagenCtrl.editTipoImagen = async (req,res)=> {
    const {id}=req.params;
    const tipoImagen={
        tpoImgNom:req.body.tpoImgNom,
        
    }
    await TipoImagen.findByIdAndUpdate(id,{$set:tipoImagen});
    res.json({status: 200 });
};

TipoImagenCtrl.removeTipoImagen= async (req, res) => {

    await TipoImagen.findByIdAndRemove(req.params.id );
    res.json({status: 200 });

};

module.exports = TipoImagenCtrl;