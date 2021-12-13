const ColegioImg = require('../model/ColegioImg');
const Colegio = require('../model/Colegio');
const BioActividad = require('../model/BioActividad');
const BioNivel = require('../model/BioNivel');
const BioInfraestructura = require('../model/BioInfraestructura');
const BioTaller = require('../model/BioTaller');
const BioQuienesSomos = require('../model/BioQuienesSomos');
const BioAnuncio = require('../model/BioAnuncio');
const BioPortada = require('../model/BioPortada');


const path = require('path');
const { unlink } = require('fs-extra');
const ColegioImgCtrl = {};

ColegioImgCtrl.getColegioImgs = async (req, res) => {
    console.log("111111111111111111");

    const colCod=req.params.colCod;

    const colegioImg = await ColegioImg.find({colCod: colCod});
    res.json(colegioImg);
};

ColegioImgCtrl.getImagenes = async (req, res) => { //Todas las imagenes

  console.log("222222222222222222222");
  const colCod=req.params.colCod;

  const colegioImg = await ColegioImg.find({$and:[{
    colCod    : colCod,
  }]});
  res.json(colegioImg);
};

ColegioImgCtrl.createColegioImg = async (req, res) => {


  console.log("4444444444444444444444");

    const GP={
        colImgTtl:  req.body.colImgTtl,
        colImgDes:  req.body.colImgDes,
        colImgRta:  '/img/uploads/' +req.file.filename,
        colImgOrgNom:  req.file.originalname,
        colImgTpoAch:  req.file.mimetype,
        colImgTmñ:     req.file.size,
        colCod:        req.body.colCod,
    }

    const colegioImg=new  ColegioImg(GP);
    await colegioImg.save();
    res.json({status: 200 });
};

ColegioImgCtrl.editarImagen = async (req,res)=> {

  const {id}=req.params;
  const colegioImg={
    colImgTtl:  req.body.colImgTtl,
    colImgDes:  req.body.colImgDes,
    tpoImgCod:  req.body.tpoImgCod,
  }

  await ColegioImg.findByIdAndUpdate(id,{$set:colegioImg});
  res.json({ status: 200 }); 
    
};


ColegioImgCtrl.deleteImg = async (req,res)=> {

  const id= req.params.id;
  const colCod=req.params.colCod

  const bioActividad=await BioActividad.find({imgCod:id, colCod: colCod},function(err, actividad){
   
     
    if(actividad.length>0){
      console.log(actividad);
      res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado actividades"}); 
    }
    else{
        BioNivel.find({imgCod:id, colCod: colCod},function(err, nivel){
        if(nivel.length>0){
          console.log(nivel);
          res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado niveles"}); 
        }
        else{
          BioInfraestructura.find({imgCod:id, colCod: colCod},function(err, infraestructura){
            if(infraestructura.length>0){
              console.log(infraestructura);
              res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado infraestructura"}); 
            }
            else{
              BioTaller.find({imgCod:id, colCod: colCod},function(err, taller){

                if(taller.length>0){
                  console.log(taller);
                  res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado talleres"}); 
                }
                else{
                  BioQuienesSomos.find({imgCod:id, colCod: colCod},function(err, qsomos){

                    if(qsomos.length>0){
                      console.log(qsomos);
                      res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado quienes somos"}); 
                    }
                    else{
                      BioAnuncio.find({imgCod:id, colCod: colCod},function(err, anuncio){
                        if(anuncio.length>0){
                          console.log(anuncio);
                          res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado anuncios"}); 
                        }
                        else{
                          BioPortada.find({imgCod:id, colCod: colCod},function(err, portada){
                            if(portada.length>0){
                              console.log(portada);
                              res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada en apartado portadas"}); 
                            }
                            else{
                              Colegio.find({_id: colCod,colImgEmb:id},function(err, emblema){
                                if(emblema.length>0){
                                  console.log(emblema);
                                  res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada como emblema"});  
                                }
                                else{
                                  Colegio.find({_id: colCod,colImgPfl:id},async function(err, perfil){
                                    if(perfil.length>0){
                                      console.log(perfil);
                                      res.json({status:410, msg: "No se puede eliminar. Imagen esta registrada como imagen de perfil"}); 
                                    }
                                    else{
                                      const photo=await ColegioImg.findByIdAndDelete(id);
                                      res.json({status:200}); 
                                    
                                      if (photo) {
                                    
                                        await unlink(path.resolve('./public' + photo.colImgRta));
                                        
                                        
                                      } 
                                    }
                                  })
                                }
                              });                    
                            }
                          });                         
                        }
                      });      
                    }
                  });
                }
              }); 
            }  
          });
        }
      });
    }
  });
  
};

module.exports = ColegioImgCtrl;