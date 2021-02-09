const Perfil = require('../model/Perfiles');


/** Modelo de los Cargos que existen en un colegio */
const Administrador = require('../model/Administrador');
const Director = require('../model/Director');
const SubDirector = require('../model/SubDirector');
const Coordinador = require('../model/Coordinador');
const Profesor = require('../model/Profesor');
const Auxiliar = require('../model/Auxiliar');
const Alumno = require('../model/Alumno');
const secretaria = require('../model/Secretaria');

/** Modelo de Aula Curso */
const AulaCurso = require('../model/AulaCurso');

/** Modelo de Periodo */
const Periodo = require('../model/Periodo');
const Secretaria = require('../model/Secretaria');
const Apoderado = require('../model/Apoderado');
const Matricula = require('../model/Matricula');

const PerfilCtrl = {};

PerfilCtrl.getPerfiles = async (req, res) => {

    console.log("Entro revision");
    var contador=0;
    const perfil = await Perfil.find().then((memes) => {
        memes.forEach((meme) => {
            contador=contador+1;
          console.log(meme._id);
        })});
    };

PerfilCtrl.getPlfSegunCargo = async (req, res) => {
    const GetParam = {
        carCod: req.body.carCod,
        colCod: req.body.colCod,
    }

    

    console.log(GetParam);
    if(GetParam.carCod=="1"){
        console.log("entro ")
        const perfil = await Perfil.find({colCod: GetParam.colCod})
        .populate('perRepCod')
        .populate('colCod')
        .populate('carCod')
        .populate('estCod')

        res.json(perfil);
    }
    else{
        console.log(GetParam.carCod);
        const perfil = await Perfil.find({carCod: GetParam.carCod, colCod: GetParam.colCod})
        .populate('perRepCod')
        .populate('colCod')
        .populate('carCod')
        .populate('estCod')
        console.log(perfil.length)
        res.json(perfil);
    }
};


   

PerfilCtrl.getPerfilColegio = async (req, res) => {

    const GetParam = {
        perRepCod: req.params.perRepCod,
        colCod: req.params.colCod,
    }
    const perfil = await Perfil.find({perRepCod: GetParam.perRepCod, colCod: GetParam.colCod, estCod:"5e0a8a3b9644411040ebf292"})
    .populate('perRepCod')
    .populate('colCod')
    .populate('carCod')
    .populate('estCod')
    console.log(GetParam);
    res.json(perfil);
};

PerfilCtrl.getPerfilUsuario = async (req, res) => {
  
    const GetParam = {
        perRepCod: req.params.perRepCod
    }
    const perfil = await Perfil.find({perRepCod: GetParam.perRepCod, estCod: "5e0a8a3b9644411040ebf292"})
    .populate('perRepCod')
    .populate('colCod');
    res.json(perfil);
};


PerfilCtrl.getPerfilesColegio = async (req, res) => {

    const GetParam = {
        colCod: req.params.colCod
    }

    console.log(GetParam);
    const perfil = await Perfil.find({colCod: GetParam.colCod})
    .populate('perRepCod')
    .populate('colCod')
    .populate('carCod')
    .populate('estCod')
    res.json(perfil);
};


PerfilCtrl.createPerfil = async (req, res) => {
    const perfil=new  Perfil(req.body);
    await perfil.save();
    res.json({status:200});
};

PerfilCtrl.DeshabilitarPerfil = async (req, res) => {
    const GetParam = {
        colCod:  req.body.colCod,
        codPfl:  req.body.codPfl,
        codMiem: req.body.codMiem,
        carCod:  req.body.carCod,
    }
    console.log(GetParam);


    const periodo= await Periodo.find({colCod: GetParam.colCod})  // se lista todos los periodos del colegio
    const ultPrdCol= periodo[periodo.length-1]._id
    console.log(ultPrdCol);

    const id_codPfl = GetParam.codPfl;
    const id_codMiem= GetParam.codMiem;

    const EstadoDeshabilitado={
        estCod:'5e0a8a479644411040ebf293', //id del documento estado que se refiere a deshabilitar
    }

    

    await Perfil.updateMany({_id:id_codPfl},{$set:EstadoDeshabilitado});
    

    if(GetParam.carCod==="5e0a916dc2a58d0b8872b2b9"){           //Codigo de cargo de director
        await Director.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a9176c2a58d0b8872b2ba"){      //Codigo de cargo de subdirector
        await SubDirector.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a917ec2a58d0b8872b2bb"){      //Codigo de cargo de coordinador
        await Coordinador.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a918cc2a58d0b8872b2bc"){      //Codigo de cargo de secretaria
        await Secretaria.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a91c3c2a58d0b8872b2c0"){      //Codigo de cargo de apoderado
        await Secretaria.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a9197c2a58d0b8872b2be"){      //Codigo de cargo de profesor
        await Profesor.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        console.log('Profesor Deshabilitado');

      
        const objAulaCurso={
            prfCod: null,
            perRepCod:null,
        }

        //Obtener periodo actual
        let fechaActual = new Date();
        var anioActual=fechaActual.getFullYear().toString();
        const periodo = await Periodo.findOne({colCod: GetParam.colCod,prdAnio: anioActual})
        const id_periodo= periodo._id;

        console.log(id_periodo);
      
        await AulaCurso.update({prfCod:GetParam.codMiem,colCod: GetParam.colCod},{$set: objAulaCurso},{multi:true});
        
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a9191c2a58d0b8872b2bd"){      //Codigo de cargo de auxiliar
        await Auxiliar.update({_id:id_codMiem},{$set:EstadoDeshabilitado});
        res.json({status:200});  
    }
    else if(GetParam.carCod==="5e0a91bbc2a58d0b8872b2bf"){      //Codigo de cargo de alumno
        await Alumno.findByIdAndUpdate({_id:id_codMiem},{$set:EstadoDeshabilitado},async(res,alu)=>{
            console.log(alu)

            const matricula = await Matricula.findOneAndUpdate({$and:[{ 
                perRepCod:alu.perRepCod._id,
                prdCod:ultPrdCol
            }]},{estCod:'5e0a8a479644411040ebf293'})



            console.log(matricula);


        }).populate("perRepCod");

        
    

        const alumApo={
            apoCod:null
        }
        await Alumno.updateOne({_id:id_codMiem},{$set:alumApo});


        res.json({status:200});  
    }
};

PerfilCtrl.HabilitarPerfil = async (req, res) => {
    var GetParam = {
        colCod:  req.body.colCod,
        codPfl:  req.body.codPfl,
        codMiem: req.body.codMiem,
        carCod:  req.body.carCod,
    }
    console.log(GetParam);
    const periodo= await Periodo.find({colCod: GetParam.colCod})  // se lista todos los periodos del colegio
    const ultPrdCol= periodo[periodo.length-1]._id
    console.log(ultPrdCol);

    /** Bloque de codigo que se ejecuta para habilitar perfiles */

        var id_codPfl = GetParam.codPfl;
        var id_codMiem= GetParam.codMiem;
    
        var EstadoHabilitado={
            estCod:'5e0a8a3b9644411040ebf292' //id del documento estado que se refiere a habilitar
        }
    
        if(GetParam.carCod==="5e0a916dc2a58d0b8872b2b9"){           //Codigo de cargo de director

            let perfilHabilitado= await Perfil.findOne({$and:[{ 
                carCod: GetParam.carCod,
                estCod: "5e0a8a3b9644411040ebf292",
                colCod: GetParam.colCod
            }]});
            if(perfilHabilitado!=undefined){
                console.log("Se enconttro un perfil habilitadoooxx");
               res.json({status:523});
            }else{
                await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
                await Director.update({_id:id_codMiem},{$set:EstadoHabilitado});
                res.json({status:200});  
            }

            
        }
        else if(GetParam.carCod==="5e0a9176c2a58d0b8872b2ba"){      //Codigo de cargo de subdirector

            let perfilHabilitado= await Perfil.findOne({$and:[{ 
                carCod: GetParam.carCod, 
                estCod: "5e0a8a3b9644411040ebf292",
                colCod: GetParam.colCod
            }]});
            if(perfilHabilitado!=undefined){
                console.log("Se enconttro un perfil habilitado");
               res.json({status:523});
            }else{
                await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
                await SubDirector.update({_id:id_codMiem},{$set:EstadoHabilitado});
                res.json({status:200});   
            }

           
        }
        else if(GetParam.carCod==="5e0a917ec2a58d0b8872b2bb"){      //Codigo de cargo de coordinador

            let perfilHabilitado= await Perfil.findOne({$and:[{ 
                carCod: GetParam.carCod, 
                estCod: "5e0a8a3b9644411040ebf292",
                colCod: GetParam.colCod
            }]});
            if(perfilHabilitado!=undefined){
                console.log("Se enconttro un perfil habilitado");
               res.json({status:523});
            }else{
                await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
                await Coordinador.update({_id:id_codMiem},{$set:EstadoHabilitado});
                res.json({status:200});  
            }

           
        }
        else if(GetParam.carCod==="5e0a918cc2a58d0b8872b2bc"){      //Codigo de cargo de secretaria
            await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
            await Secretaria.update({_id:id_codMiem},{$set:EstadoHabilitado});
            res.json({status:200});  
           
        }
        else if(GetParam.carCod==="5e0a91c3c2a58d0b8872b2c0"){      //Codigo de cargo de apoderado
            await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
            await Apoderado.update({_id:id_codMiem},{$set:EstadoHabilitado});
            res.json({status:200});  

           
        }
        else if(GetParam.carCod==="5e0a9197c2a58d0b8872b2be"){      //Codigo de cargo de profesor
            await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
            await Profesor.update({_id:id_codMiem},{$set:EstadoHabilitado});
            console.log('Profesor Habilitado');
    
          
            const objAulaCurso={
                prfCod: null,
                perRepCod:null,
            }
    
            //Obtener periodo actual
            let fechaActual = new Date();
            var anioActual=fechaActual.getFullYear().toString();
            const periodo = await Periodo.findOne({colCod: GetParam.colCod,prdAnio: anioActual})
            const id_periodo= periodo._id;
    
            console.log(id_periodo);
          
            await AulaCurso.update({prfCod:GetParam.codMiem,colCod: GetParam.colCod},{$set: objAulaCurso},{multi:true});
            
            res.json({status:200});  
        }
        else if(GetParam.carCod==="5e0a9191c2a58d0b8872b2bd"){      //Codigo de cargo de auxiliar
            await Perfil.update({_id:id_codPfl},{$set:EstadoHabilitado});
            await Auxiliar.update({_id:id_codMiem},{$set:EstadoHabilitado});
            res.json({status:200});  
        }
        else if(GetParam.carCod==="5e0a91bbc2a58d0b8872b2bf"){      //Codigo de cargo de alumno

            await Perfil.findOne({_id:id_codPfl},async(err,perfil)=>{

                var alumFullExist = await Alumno.findOne({$and:[{
                    perRepCod: perfil.perRepCod,
                    estCod: '5e0a8a3b9644411040ebf292'
                }]});
                
                
                if(alumFullExist!=undefined){   // Es alumno en otro colegio
                    res.json({status: 509 }); 
                }
                else{
                    console.log("va a habilitar");
                    await Perfil.updateOne({_id:id_codPfl},{$set:EstadoHabilitado});
                    await Alumno.findByIdAndUpdate({_id:id_codMiem},{$set:EstadoHabilitado},async(err,alu)=>{
                        console.log(alu);

                        const matricula = await Matricula.findOne({$and:[{ 
                            perRepCod:alu.perRepCod._id,
                            prdCod:ultPrdCol
                        }]});

                        const newMatricula = await Matricula.updateOne({_id:matricula._id},{estCod: "5e0a8a3b9644411040ebf292"})
            
            
            
                        console.log(newMatricula);


                    }).populate("perRepCod");
                    res.json({status:200}); 
                }   
            
            
            })
 
        }
};




PerfilCtrl.DeletePerfil = async (req, res) => {
    const {id}=req.params;
    
        await Perfil.findByIdAndRemove(id);
        res.json({status:200});
};


/*
PerfilCtrl.getPerfil = async (req, res) => {
    const perfil={
        perCod=req.perCod,
        colCod=req.colCod,
        estCod="5d32b928b20adc1e18026651"
    }
    const perfil= await Perfil.findById(req.params.id); //Buscar perfiles que corresponda con 3 parametros enviados
    console.log(perfil);
    res.json(perfil); 
};
*/


/*
PerfilCtrl.eliminarPerfil = async (req,res)=> {
    const {id}=req.params;
    const perfil={
        estCod:"5d32bba953761812cc1698be" //id del documento estado que se refiere a una baja temporal
    }
    await Perfil.findByIdAndUpdate(id,{$set:perfil});
    res.json({status:'Perfil Eliminado' });
};
*/

PerfilCtrl.deletePerfil = async (req,res)=> {

    await Perfil.findByIdAndRemove(req.params.id);
    res.json({status:'Perfil Eliminado'});
};


module.exports =  PerfilCtrl;