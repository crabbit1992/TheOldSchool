const NucleoImagen = require('../model/NucleoImagen');
const path = require('path');
const { unlink } = require('fs-extra');
const NucleoImagenCtrl = {};

NucleoImagenCtrl.getNucleoImagenes = async (req, res) => {

    const nucleoImagen = await NucleoImagen.find();
    res.json(nucleoImagen);
};

NucleoImagenCtrl.createNucleoImagen = async (req, res) => {

    const GP={
        ncoImgTtl:  req.body.ncoImgTtl,
        ncoImgDes:  req.body.ncoImgDes,
        ncoImgRta:  '/img/uploads/' +req.file.filename,
        ncoImgOrgNom:  req.file.originalname,
        ncoImgTpoAch:  req.file.mimetype,
        ncoImgTmñ:     req.file.size,
    }


    const nucleoImagen=new  NucleoImagen(GP);
    await nucleoImagen.save();
    res.json({status: 200 });

};

NucleoImagenCtrl.editarImagen = async (req,res)=> {

  const {id}=req.params;
  const nucleoImagen={
    ncoImgTtl:  req.body.ncoImgTtl,
    ncoImgDes:  req.body.ncoImgDes,
    tpoImgCod:  req.body.tpoImgCod,
  }

  await NucleoImagen.findByIdAndUpdate(id,{$set:nucleoImagen});
  res.json({ status: 200 }); 
    
};


NucleoImagenCtrl.deleteImg = async (req,res)=> {

  const id= req.params.id;

  const photo=await NucleoImagen.findByIdAndRemove(id)

    if (photo) {
        await unlink(path.resolve('./server/public' + photo.ncoImgRta));
        res.json({status:200}); 
    } 
    else{
        res.json({status:400}); 
    }

  

};

module.exports = NucleoImagenCtrl;