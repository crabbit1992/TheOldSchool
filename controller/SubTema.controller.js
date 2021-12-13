const SubTema = require('../model/SubTema');
const ImgAll = require('../model/ImgAll');
const path = require('path');
const { unlink } = require('fs-extra');
const SubTemaCtrl = {};

SubTemaCtrl.getSubTemas = async (req, res) => {

    const gp={
        temCod:  req.params.temCod,
        libCod:  req.params.libCod,
    }

    //await SubTema.remove();

    const subTema = await SubTema.find({libCod: gp.libCod, temCod: gp.temCod})
    .populate('imgCod')
    .sort (  { "nroOrd" :  1 }  );;
    res.json(subTema); 
};

SubTemaCtrl.createSubTema = async (req, res) => {

    const gp = {
        nroOrd:req.body.nroOrd,
        libCod: req.body.libCod,
        temCod: req.body.temCod,
        subTemTtl:  req.body.subTemTtl.trim(),
        subTemDes:  req.body.subTemDes.trim(),
        image: req.file,
    }

    console.log(gp);

    const img={
        ImgAllRta:  '/img/uploads/' +req.file.filename,
        ImgAllOrgNom:  req.file.originalname,
        ImgAllTpoAch:  req.file.mimetype,
        ImgAllTmñ:     req.file.size,
    }

    const subTemaExist= await SubTema.findOne({subTemTtl:gp.subTemTtl, temCod:gp.temCod});

    if(subTemaExist){ 
        res.json({status: 510 }); //Ya hay un SubTema con este titulo
    }
    else{

        const newImgAll=new  ImgAll(img);
        const imgAllCod = await newImgAll.save();

        let subTema = {
            libCod:gp.libCod,
            temCod:gp.temCod,
            nroOrd:gp.nroOrd,
            subTemTtl:gp.subTemTtl,
            subTemDes:gp.subTemDes,
            imgCod:imgAllCod._id
        }

        const newSubTema=new SubTema(subTema);
        await newSubTema.save();   // se crea un nuevo registro en el documento  
        res.json({status:200});
    }
 
};

SubTemaCtrl.editSubTema = async (req,res)=> {
    var {id}=req.params;   //id del subtema

    const gp = {
        nroOrd:      req.body.nroOrd,
        libCod:      req.body.libCod,
        temCod:      req.body.temCod,
        subTemTtl:   req.body.subTemTtl.trim(),
        subTemDes:   req.body.subTemDes.trim(),
        image:       req.file,
    }
    console.log(gp);

    if(gp.image==undefined||gp.image==null){
        let subTema = {
            libCod:gp.libCod,
            temCod:gp.temCod,
            nroOrd:gp.nroOrd,
            subTemTtl:gp.subTemTtl,
            subTemDes:gp.subTemDes,
        }

        await SubTema.findByIdAndUpdate(id,{$set:subTema});
        res.json({status:200 }); 
    }
    else{

        var subTemaAct =await SubTema.findOne({_id:id});
        var imgCod=subTemaAct.imgCod;
        
        const imgDeleting= await ImgAll.findByIdAndDelete({_id:imgCod})
        await unlink(path.resolve('./public' + imgDeleting.ImgAllRta));
        
        const img={
            ImgAllRta:  '/img/uploads/' +req.file.filename,
            ImgAllOrgNom:  req.file.originalname,
            ImgAllTpoAch:  req.file.mimetype,
            ImgAllTmñ:     req.file.size,
        }

        const newImgAll=new  ImgAll(img);
        const imgAllCod = await newImgAll.save();

        let subTema = {
            libCod:gp.libCod,
            temCod:gp.temCod,
            nroOrd:gp.nroOrd,
            subTemTtl:gp.subTemTtl,
            subTemDes:gp.subTemDes,
            imgCod:imgAllCod._id
        }

        await SubTema.findByIdAndUpdate(id,{$set:subTema});
        res.json({status:200 });
    }
    
};

SubTemaCtrl.deleteSubTema = async (req,res)=> {
    var _id=req.params.id

    const EstadoDeshabilitado={
        estCod:'5e0a8a479644411040ebf293', //id del documento estado que se refiere a deshabilitar
    }

    await SubTema.updateOne({_id:_id},{$set:EstadoDeshabilitado});
    res.json({status:200});
};


module.exports = SubTemaCtrl;