const AulaVirtual = require('../model/AulaVirtual');
const Nota = require('../model/Nota');
const Periodo = require('../model/Periodo');
const TipoNotaCurso = require('../model/TipoNotaCurso');
const Matricula = require('../model/Matricula');
const AulaVirtualCTRL = {};

AulaVirtualCTRL.getAlulaColegio = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
    }
    console.log("5454545");

    const aulaVirtualPrdActual = await AulaVirtual.find({colCod: GetParam.colCod})
        .populate('graCod')
        .populate('secCod')
        .populate('nivCod')
        .populate('turCod')
        .sort (  { "nivCod" :  -1, "graCod" :  1  }  )

        res.json(aulaVirtualPrdActual);
    
};

AulaVirtualCTRL.getAulasVirtuales= async (req,res) =>{
    const GP={
        graCod: req.body.graCod,
        secCod: req.body.secCod,
        nivCod: req.body.nivCod,
        turCod: req.body.turCod,
        colCod: req.body.colCod
    }

    console.log(GP);

    if(GP.graCod==undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.turCod==undefined){
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );   
            
        console.log(aulavirtual);
        res.json(aulavirtual); 
    }
    

    if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de gradCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod    
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de gradCod y secCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod, 
            secCod: GP.secCod     
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de gradCod, secCod y nivCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            secCod: GP.secCod,
            nivCod: GP.nivCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de gradCod, secCod, nivCod y turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod, 
            secCod: GP.secCod,
            nivCod: GP.nivCod,
            turCod: GP.turCod    
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );

            console.log(aulavirtual);
        res.json(aulavirtual); 
    }

/***********************************************************************************************************/

    if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de secCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod     
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de secCod y nivCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod,
            nivCod: GP.nivCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de secCod, nivCod y turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod,
            nivCod: GP.nivCod,
            turCod: GP.turCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

/***********************************************************************************************************/    

    if( GP.graCod==undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de nivCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            nivCod: GP.nivCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );
        res.json(aulavirtual); 
    }

    if( GP.graCod==undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de nivCod y turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            nivCod: GP.nivCod,
            turCod: GP.turCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

/***********************************************************************************************************/ 

    if( GP.graCod==undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            turCod: GP.turCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

/***********************************************************************************************************/

    if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de graCod y turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            turCod: GP.turCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.turCod==undefined ){
        // buscar solo con el parametro de graCod y nivCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            nivCod: GP.nivCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de secCod y turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod,
            turCod: GP.turCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }

    if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.turCod!=undefined ){
        // buscar solo con el parametro de grado nivCod y turCod
        const aulavirtual = await AulaVirtual.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            nivCod: GP.nivCod,
            turCod: GP.turCod
            }]}).populate('graCod').populate('secCod').populate('nivCod').populate('turCod')
            .sort (  { "nivCod" :  1, "graCod" :  1  }  );;
        res.json(aulavirtual); 
    }
    console.log(GP);
}

AulaVirtualCTRL.createAulaVirtual = async (req, res) => {
    const GetParam = {
        graCod: req.body.graCod,
        secCod: req.body.secCod,
        nivCod: req.body.nivCod,
        turCod: req.body.turCod,
        colCod: req.body.colCod,
    }

    console.log(GetParam);

    const aulVirtualExist = await AulaVirtual.findOne(
        {$and:[{ graCod: GetParam.graCod,secCod: GetParam.secCod,nivCod: GetParam.nivCod,colCod: GetParam.colCod }]});

    if(aulVirtualExist!=undefined){
        console.log(aulVirtualExist);
        res.json({status: 510});
    }
    else{
        console.log("entro");
        const newAulaVirtual=new AulaVirtual(GetParam);
        await newAulaVirtual.save();   // se crea un nuevo registro en el documento  
        res.json({status: 200}); 
    }
  
};

AulaVirtualCTRL.editAulaVirtual = async(req, res)=>{

    console.log("Entro al aula editar");
    

    const id= req.params.id;

    const GP={
        graCod: req.body.graCod,
        secCod: req.body.secCod,
        nivCod: req.body.nivCod,
        turCod: req.body.turCod,
        colCod: req.body.colCod
    }

    const alVir = await AulaVirtual.findOne({_id:id});

    const matricula = await Matricula.findOne(
        {
            graCod: alVir.graCod, 
            secCod: alVir.secCod,
            nivCod: alVir.nivCod,
            turCod: alVir.turCod,
            colCod: alVir.colCod
        });

    if(matricula){
        console.log("No se puede editar, existen alumnos matriculados en el aula");
        res.json({status: 420}); 
    }    
    else{
        const nota= await Nota.findOne({alvCod: id});

        if(nota){
            console.log("No se puede editar, existen notas asociadas");
            res.json({status: 421}); 
        }
        else{

            const tipoNotCurso= await TipoNotaCurso.findOne({aulVirCod: id});

            if(tipoNotCurso){
                console.log("No se puede editar, existen tipos de notas asociadas");
                res.json({status: 422}); 
            }
            else{
                

                let aulaExist= await AulaVirtual.findOne({
                    graCod: GP.graCod, 
                    secCod: GP.secCod, 
                    nivCod: GP.nivCod,
                    colCod: GP.colCod
                })

              
                if(aulaExist){
                    if(aulaExist._id==id){
                        console.log("Si se puede editar");
                        await AulaVirtual.updateOne({_id: id},GP)
                        res.json({status: 200}); 
                    }
                    else{
                        console.log("No se puede editar, ya existe esta aula");
                        res.json({status: 510}); 
                    }    
                }
                else{
                    console.log("Si se puede editar");
                    await AulaVirtual.updateOne({_id: id},GP)
                    res.json({status: 200}); 
                }

               
            }
        }
    }
};

AulaVirtualCTRL.deshabilitarAula = async (req,res)=> {

    console.log("11111133333");

    const id= req.body._id;
    const alVir = await AulaVirtual.findOne({_id:id});
    console.log(alVir);
    let fechaActual = new Date();
    var anioActual  = fechaActual.getFullYear();

    const periodo = await Periodo.findOne({prdAnio : anioActual});
    console.log(periodo._id);

    if(periodo){

        const matricula = await Matricula.find(
        {
            graCod: alVir.graCod, 
            secCod: alVir.secCod,
            nivCod: alVir.nivCod,
            turCod: alVir.turCod,
            prdCod: periodo._id,
            colCod: alVir.colCod
        });

        console.log(matricula);

        if(matricula.length>0){
            console.log("Hay matriculas en esta aula, no se puede deshabilitar");
            res.json({status: 420}); 
        }
        else{
            console.log("Se puede deshabilitar el aula");
            await AulaVirtual.updateOne({_id:id},{estCod: "5e0a8a479644411040ebf293"})
            res.json({status: 200}); 
        }
    }
    else{
        console.log("No hay ningun periodo en ese año,  se puede deshabilitar");
        await AulaVirtual.updateOne({_id:id},{estCod: "5e0a8a479644411040ebf293"})
        res.json({status: 200}); 
    }
}

AulaVirtualCTRL.habilitarAula = async (req,res)=> {

    const id= req.body._id;
    console.log("habilitar");

    await AulaVirtual.updateOne({_id:id},{estCod: "5e0a8a3b9644411040ebf292"})
    res.json({status: 200}); 

}

AulaVirtualCTRL.deleteAulaVirtual = async (req,res)=> {
    await AulaVirtual.findByIdAndRemove(req.params.id);
    res.json({status: 200}); 
};


module.exports = AulaVirtualCTRL;