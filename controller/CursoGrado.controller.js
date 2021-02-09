const CursoGrado = require('../model/CursoGrado');
const Periodo = require('../model/Periodo');

const AulaVirtual = require('../model/AulaVirtual');
const AulaCurso = require('../model/AulaCurso');
const TipoNotaCurso = require('../model/TipoNotaCurso');

const Promedio = require('../model/Promedio');
const CursoGradoCtrl = {};

CursoGradoCtrl.getCursosGrado = async (req, res) => { //Cursos correspondientes al grado
    const GetParam = {
        graCod: req.params.graCod,
        nivCod: req.params.nivCod,
        colCod: req.params.colCod,
    }

    const cursogrado = await CursoGrado.find({$and:[{
             graCod:GetParam.graCod,
             nivCod:GetParam.nivCod,
             colCod:GetParam.colCod, 
        }]})
   .populate('graCod').populate('curCod').populate('areCod').populate('nivCod')
   .sort (  { "nivCod" :  1, "graCod" :  1,"areCod":1  }  );
    
    console.log(GetParam);
    res.json(cursogrado); 
};


CursoGradoCtrl.getCursoGrado = async (req, res) => { 
    const GP = {
        graCod: req.body.graCod,
        nivCod: req.body.nivCod,
        curCod: req.body.curCod,
        areCod: req.body.areCod,
        colCod: req.body.colCod,        
    }
    console.log(req.body);
    console.log("ddddd");

    if(GP.graCod!=undefined && GP.nivCod==undefined && GP.curCod==undefined && GP.areCod==undefined){
        // Filtrar por grado

        console.log("entro aca");
        const cursogrado = await CursoGrado.find({$and:[{ graCod:GP.graCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod!=undefined && GP.nivCod!=undefined && GP.curCod==undefined && GP.areCod==undefined){
        // Filtrar por grado y nivel
       
        const cursogrado = await CursoGrado.find({$and:[{ graCod:GP.graCod, nivCod:GP.nivCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod!=undefined && GP.nivCod!=undefined && GP.curCod!=undefined && GP.areCod==undefined){
        // Filtrar por grado, nivel y curso
        const cursogrado = await CursoGrado.find({$and:[{ graCod:GP.graCod, nivCod:GP.nivCod,curCod:GP.curCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod!=undefined && GP.nivCod==undefined && GP.curCod==undefined && GP.areCod!=undefined){
        // Filtrar por grado, y area
        const cursogrado = await CursoGrado.find({$and:[{ graCod:GP.graCod, areCod:GP.areCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod==undefined && GP.nivCod!=undefined && GP.curCod!=undefined && GP.areCod==undefined){
        // Filtrar por nivel y curso
        const cursogrado = await CursoGrado.find({$and:[{ nivCod:GP.nivCod,curCod:GP.curCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod==undefined && GP.nivCod==undefined && GP.curCod!=undefined && GP.areCod==undefined){
        // Filtrar por curso
        const cursogrado = await CursoGrado.find({$and:[{ curCod:GP.curCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        console.log(cursogrado);
        res.json(cursogrado);
    }
    else if(GP.graCod!=undefined && GP.nivCod==undefined && GP.curCod!=undefined && GP.areCod==undefined){
        // Filtrar por grado y curso
        const cursogrado = await CursoGrado.find({$and:[{ graCod:GP.graCod, curCod:GP.curCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod==undefined && GP.nivCod!=undefined && GP.curCod==undefined && GP.areCod==undefined){
        // Filtrar por nivel
        const cursogrado = await CursoGrado.find({$and:[{ nivCod:GP.nivCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod==undefined && GP.nivCod==undefined && GP.curCod==undefined && GP.areCod==undefined){
        // Filtrar por Colegio
        const cursogrado = await CursoGrado.find({$and:[{ colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }    
    else if(GP.graCod==undefined && GP.nivCod==undefined && GP.curCod==undefined && GP.areCod!=undefined){
        // Filtrar por area
        console.log("Filtrar por area");
        const cursogrado = await CursoGrado.find({$and:[{  areCod: GP.areCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    } 
    else if(GP.graCod==undefined && GP.nivCod==undefined && GP.curCod!=undefined && GP.areCod!=undefined){
        // Filtrar por area y curso
        const cursogrado = await CursoGrado.find({$and:[{  areCod: GP.areCod, curCod:GP.curCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    } 
    else if(GP.graCod!=undefined && GP.nivCod!=undefined && GP.curCod==undefined && GP.areCod!=undefined){
        // Filtrar por area, grado y nivel
        const cursogrado = await CursoGrado.find({$and:[{  areCod: GP.areCod, graCod:GP.graCod, nivCod:GP.nivCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    } 
    else if(GP.graCod==undefined && GP.nivCod!=undefined && GP.curCod!=undefined && GP.areCod!=undefined){
        // Filtrar por area, curso y nivel
        const cursogrado = await CursoGrado.find({$and:[{  areCod: GP.areCod, curCod:GP.curCod, nivCod:GP.nivCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod!=undefined && GP.nivCod!=undefined && GP.curCod!=undefined && GP.areCod!=undefined){
        // Filtrar por area, curso, nivel y grado
        const cursogrado = await CursoGrado.find({$and:[{  areCod: GP.areCod, curCod:GP.curCod, nivCod:GP.nivCod, graCod:GP.graCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
    else if(GP.graCod==undefined && GP.nivCod!=undefined && GP.curCod==undefined && GP.areCod!=undefined){
        // Filtrar por nivel y area
        const cursogrado = await CursoGrado.find({$and:[{  nivCod: GP.nivCod, areCod:GP.areCod, colCod:GP.colCod }]})
        .populate('graCod').populate('curCod').populate('nivCod').populate('areCod')
        .sort (  { "areCod":1  }  );
        res.json(cursogrado);
    }
};

CursoGradoCtrl.getCursosGradoCol = async (req, res) => { //Cursos correspondientes al grado
    const GetParam = {
        colCod: req.params.colCod,
    }

    const cursogrado = await CursoGrado.find({$and:[{ colCod:GetParam.colCod }]})
    .populate('graCod')
    .populate('nivCod')
    .populate('curCod')
    .populate('areCod')
    .sort (  { "nivCod" :  1, "graCod" :  1,"areCod":1  }  );;
    
    console.log(GetParam);
    res.json(cursogrado); 
};


CursoGradoCtrl.createCursoGrado = async (req, res) => {
    const GetParam = {
        graCod: req.body.graCod,
        nivCod: req.body.nivCod,
        curCod: req.body.curCod,
        areCod: req.body.areCod,
        colCod: req.body.colCod,
    }

    console.log(GetParam);


    const CursoGradoExist = await CursoGrado.findOne({$and:[{
        graCod:GetParam.graCod, nivCod:GetParam.nivCod, curCod:GetParam.curCod, colCod:GetParam.colCod}]});

    if(CursoGradoExist!=undefined){
        console.log(CursoGradoExist);
        res.json({status:510});
    }
    else{
        const newCursoGrado=new CursoGrado(GetParam);
        await newCursoGrado.save();   // se crea un nuevo registro en el documento  
        res.json({status:200}); 
    }

};

CursoGradoCtrl.editCursoGrado = async (req,res)=> {
    const {id}=req.params;
    const GP={
        graCod: req.body.graCod,
        nivCod: req.body.nivCod,
        curCod: req.body.curCod,
        areCod: req.body.areCod,
    }

    console.log(GP);

    await CursoGrado.findById(id,async(err, cg)=>{
        if(GP.graCod==cg.graCod && GP.nivCod==cg.nivCod && GP.curCod==cg.curCod._id && GP.areCod==cg.areCod){
            console.log("Se puede editar, no se realizara ningun cambio");
            await CursoGrado.findOneAndUpdate({_id: id},{$set:GP});
            res.json({status:200}); 
        }
        else{
            console.log("Entro al else");
            const CursoGradoExist=await CursoGrado.findOne({$and:[{
                graCod:GP.graCod,
                nivCod:GP.nivCod,
                curCod:GP.curCod, 
                areCod:GP.areCod,
                colCod:cg.colCod
            }]}).populate("curCod");
         
            if(CursoGradoExist){
                console.log(CursoGradoExist);
                console.log("El curso seleccionado ya existe en el nivel");
                res.json({status:510}); // El curso seleccionado ya existe en el nivel
            }
            else{
                console.log("El curso seleccionado aun no se ha creado, se puede editar");

                const periodo= await Periodo.find({colCod: cg.colCod});
                var ultPrd= periodo[periodo.length-1];

                const promExist= await Promedio.find({prdCod: ultPrd._id, curCod: cg.curCod._id});
               
                if(promExist.length>0){
                    console.log("Hay notas asociadas con este curso en este periodo, no se puede editar");
                    res.json({status:514}); //Hay notas asociadas con este curso en este periodo, no se puede editar
                }
                else{
                    console.log("No existe ningun promedio asociado, se puede editar");

                    const aulasVirtuales=await AulaVirtual.find({
                        graCod: GP.graCod, 
                        nivCod: GP.nivCod, 
                        colCod: cg.colCod
                    });

                    for(var i=0; i<aulasVirtuales.length;i++){
                        console.log("0000");
                        await AulaCurso.findOne({aulVirCod: aulasVirtuales[i]._id, areCod:GP.areCod, curCod: cg.curCod._id},async(err, aulaCurso)=>{
                            
                            if(aulaCurso){
                                await AulaCurso.findOneAndRemove({_id: aulaCurso._id}, {useFindAndModify: false})
                            }
                        });

                        /*
                        await TipoNotaCurso.find({aulVirCod: aulasVirtuales[i]._id, curCod: cg.curCod._id, prdCod: ultPrd._id},async(err, tpoNtaCur)=>{
                            
                            if(tpoNtaCur.length>0){
                                await TipoNotaCurso.deleteMany({aulVirCod: aulasVirtuales[i]._id, curCod: cg.curCod._id, prdCod: ultPrd._id})
                            }
                        });
                        */
                    }
 
                    await CursoGrado.findOneAndUpdate({_id: id},{$set:GP}, {useFindAndModify: false});
                    res.json({status:200}); 
                }
            }
        }
    }).populate("curCod");
};

CursoGradoCtrl.deleteCursoGrado = async (req,res)=> {

    const {id}=req.params;

    const cursoGrado = await CursoGrado.findOne({_id:id}).populate("curCod");
    const colCod= cursoGrado.colCod;
    const areCod= cursoGrado.areCod;
    const curCod= cursoGrado.curCod._id;
    const periodo= await Periodo.find({colCod: colCod});
    const ultPrd= periodo[periodo.length-1];

    const promExist= await Promedio.find({prdCod: ultPrd._id, curCod: curCod});

    if(promExist.length>0){
        console.log("Hay notas asociadas con este curso en este periodo, no se puede eliminar");
        res.json({status:514}); //Hay notas asociadas con este curso en este periodo, no se puede editar
    }
    else{
        console.log("No existen notas asociadas, se puede eliminar sin problemas");

 
        const graCod= cursoGrado.graCod;
        const nivCod= cursoGrado.nivCod;

        const aulasVirtuales=await AulaVirtual.find({
            graCod: graCod, 
            nivCod: nivCod, 
            colCod: cursoGrado.colCod
        });

        console.log(aulasVirtuales.length)

        for(var i=0; i<aulasVirtuales.length;i++){
            console.log("0000");
            await AulaCurso.findOne({aulVirCod: aulasVirtuales[i]._id, areCod: areCod, curCod: curCod},async(err, aulaCurso)=>{
                
                if(aulaCurso){
                    console.log("Se encontro un registro en aula curso");
                    await AulaCurso.findOneAndRemove({_id: aulaCurso._id}, {useFindAndModify: false});
                }
            });
        }
        await CursoGrado.findOneAndRemove({_id: id}, {useFindAndModify: false});
        res.json({status:200}); 
     
    }
};

module.exports = CursoGradoCtrl;