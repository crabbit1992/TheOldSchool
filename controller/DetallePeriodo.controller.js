const DetallePeriodo = require('../model/DetallePeriodo');
const Periodo = require('../model/Periodo');
const Nota = require('../model/Nota');
const { deletePeriodo } = require('./Periodo.controller');
const DetallePeriodoCtrl = {};

DetallePeriodoCtrl.createDetallePeriodo = async(req, res) =>{
    console.log("entrooo");
    const GP = {
        prdCod   : req.body.prdCod,
        tpoPrdCod: req.body.tpoPrdCod,
        detPrdSgt: req.body.detPrdSgt,
        detPrdIni: req.body.detPrdIni,
        detPrdFin: req.body.detPrdFin
    }


    const detPrd = await DetallePeriodo.findOne({$and:[{
        prdCod      :GP.prdCod,
        detPrdSgt   :GP.detPrdSgt
    }]});



    if(detPrd!=undefined){
        console.log("Entro aca");
        res.json({status:510});
    }
    else{

        const parseGpIni=Date.parse(GP.detPrdIni); 
        const parseGpFin=Date.parse(GP.detPrdFin); 
        const fechaIniGP = new Date(parseGpIni);
        const fechaFinGP = new Date(parseGpFin);

        const anioIni=fechaIniGP.getUTCFullYear();
        const mesIni=fechaIniGP.getUTCMonth()+1;
        const diaIni=fechaIniGP.getUTCDate();
        const anioFin=fechaFinGP.getUTCFullYear();
        const mesFin=fechaFinGP.getUTCMonth()+1;
        const diaFin=fechaFinGP.getUTCDate();

        var rpta=200;

    /** Funcion para validar fechas */
        function validarFecha(){
            var trueOrFalse=0;

            if(GP.detPrdIni.substring(0,4)!=anioIni){
                trueOrFalse=508;
            }
            else if(GP.detPrdIni.substring(5,7)!=mesIni){
                trueOrFalse=508;
            }
            else if(GP.detPrdIni.substring(8,10)!=diaIni){
                trueOrFalse=508;
            }
            else if(GP.detPrdFin.substring(0,4)!=anioFin){
                trueOrFalse=509;
            }
            else if(GP.detPrdFin.substring(5,7)!=mesFin){
                trueOrFalse=509;
            }
            else if(GP.detPrdFin.substring(8,10)!=diaFin){
                trueOrFalse=509;
            }
            return trueOrFalse;
        }

        if(validarFecha()==508){
            rpta=508;
        }
        else if(validarFecha()==509){
            rpta=509;
        }
        else if(validarFecha()==0){

            const idPrd=GP.prdCod;
            var periodo= await Periodo.findById(idPrd);
            var detallePeriodo= await DetallePeriodo.find({prdCod:idPrd}).sort('detPrdIni');

            if(detallePeriodo.length==0){
 
                if(fechaFinGP>periodo.prdFchFin || fechaFinGP<periodo.prdFchIni || fechaIniGP<periodo.prdFchIni || fechaIniGP>periodo.prdFchFin){
                    rpta=520;
                }
                else if(fechaIniGP>fechaFinGP){
                    rpta=521;
                }
                else if(fechaFinGP<fechaIniGP){
                    rpta=522;
                }
               
            }
            else{

                if(periodo.prdFchIni>fechaIniGP){
                    console.log("Esta fuera de fecha la fecha de inicio");
                    rpta=520;
                }
                else if(periodo.prdFchFin<fechaFinGP){
                    rpta=520;
                    console.log("Esta fuera de fecha la fecha de fin");
                } 
                else{

                    for(var i=0;i<detallePeriodo.length;i++){
                    
                        if(fechaFinGP>periodo.prdFchFin || fechaFinGP<periodo.prdFchIni || fechaIniGP<periodo.prdFchIni || fechaIniGP>periodo.prdFchFin){
                            rpta=520;
                        }
                        else if(fechaIniGP>fechaFinGP){
                            rpta=521;
                        }
                        else if(fechaFinGP<fechaIniGP){
                            rpta=522;
                        }
                        else{ 
                            
                            if(fechaFinGP>=detallePeriodo[i].detPrdIni && fechaFinGP<=detallePeriodo[i].detPrdFin){
                                rpta=513;
                            }
                            else if(fechaIniGP>=detallePeriodo[i].detPrdIni && fechaIniGP<=detallePeriodo[i].detPrdFin){
                                rpta=512;
                            }     
                        }
                    } 
                }
            }              
        }

        if(rpta==200){
            console.log(rpta);
            const detallePeriodo=new  DetallePeriodo(GP);
            await detallePeriodo.save();
            res.json({status:rpta});
        }
        else{
            console.log(rpta);
            res.json({status:rpta});
        }
    }
};

DetallePeriodoCtrl.editDetallePeriodo = async(req, res) =>{

    const {id}=req.params;
    const GP = {
        detPrdIni: req.body.detPrdIni,
        detPrdFin: req.body.detPrdFin
    }
    console.log(GP);

    var rpta=200;
    const parseGpIni=Date.parse(GP.detPrdIni); 
    const parseGpFin=Date.parse(GP.detPrdFin); 
    const fechaIniGP = new Date(parseGpIni);
    const fechaFinGP = new Date(parseGpFin);

    const anioIni=fechaIniGP.getUTCFullYear();
    const mesIni=fechaIniGP.getUTCMonth()+1;
    const diaIni=fechaIniGP.getUTCDate();
    const anioFin=fechaFinGP.getUTCFullYear();
    const mesFin=fechaFinGP.getUTCMonth()+1;
    const diaFin=fechaFinGP.getUTCDate();

    function validarFecha(){
        var trueOrFalse=0;

        if(GP.detPrdIni.substring(0,4)!=anioIni){
            trueOrFalse=508;
        }
        else if(GP.detPrdIni.substring(5,7)!=mesIni){
            trueOrFalse=508;
        }
        else if(GP.detPrdIni.substring(8,10)!=diaIni){
            trueOrFalse=508;
        }
        else if(GP.detPrdFin.substring(0,4)!=anioFin){
            trueOrFalse=509;
        }
        else if(GP.detPrdFin.substring(5,7)!=mesFin){
            trueOrFalse=509;
        }
        else if(GP.detPrdFin.substring(8,10)!=diaFin){
            trueOrFalse=509;
        }
        return trueOrFalse;
    }

    if(validarFecha()==508){
        rpta=508;
    }
    else if(validarFecha()==509){
        rpta=509;
    }
    else if(validarFecha()==0){
   
        const detPrd = await DetallePeriodo.findById(id);
        const idPrd=detPrd.prdCod;
        var periodo= await Periodo.findById(idPrd);
        var detallePeriodo= await DetallePeriodo.find({prdCod:idPrd}).sort('detPrdIni');
        
        
        if(detallePeriodo==0){

            if(fechaFinGP>periodo.prdFchFin || fechaFinGP<periodo.prdFchIni || fechaIniGP<periodo.prdFchIni || fechaIniGP>periodo.prdFchFin){
                rpta=520;
            }
            else if(fechaIniGP>fechaFinGP){
                rpta=521;
            }
            else if(fechaFinGP<fechaIniGP){
                rpta=522;
            }
            
        }
        else{

            /** Eliminar el objeto que va a ser editado del array de detalles */
            for(var h=0;h<detallePeriodo.length;h++){
                if(detallePeriodo[h]._id.toString()==detPrd._id.toString()){
                    detallePeriodo.splice(h,1)
                }
            }
            console.log(detallePeriodo);
            if(detallePeriodo.length==0){
                
               if(fechaFinGP>periodo.prdFchFin || fechaFinGP<periodo.prdFchIni || fechaIniGP<periodo.prdFchIni || fechaIniGP>periodo.prdFchFin){
                    rpta=520;
                }
                else if(fechaIniGP>fechaFinGP){
                    rpta=521;
                }
                else if(fechaFinGP<fechaIniGP){
                    rpta=522;
                }
            }
            else{
                /** Recorrer el array detallePeriodo y validar que las fecha no se crusen */
                
                for(var i=0;i<detallePeriodo.length;i++){
                    
                    if(fechaFinGP>periodo.prdFchFin || fechaFinGP<periodo.prdFchIni || fechaIniGP<periodo.prdFchIni || fechaIniGP>periodo.prdFchFin){
                        rpta=520;
                    }
                    else if(fechaIniGP>fechaFinGP){
                        rpta=521;
                    }
                    else if(fechaFinGP<fechaIniGP){
                        rpta=522;
                    }
                    else{ 
                        
                        if(fechaFinGP>=detallePeriodo[i].detPrdIni && fechaFinGP<=detallePeriodo[i].detPrdFin){
                            rpta=513;
                        }
                        else if(fechaIniGP>=detallePeriodo[i].detPrdIni && fechaIniGP<=detallePeriodo[i].detPrdFin){
                            console.log("Entroo f");  
                            console.log(detallePeriodo[i]._id);   
                            console.log(id);

                            if(detallePeriodo[i]._id==id){
                                rpta=200;
                            }
                            else{
                                rpta=512;
                            }

                            
                        }                    
                    }
                }
            }
        }
    }

    console.log(rpta);
    if(rpta==200){
        
        await DetallePeriodo.findByIdAndUpdate(id,{$set:GP});
        res.json({status:rpta});
    }
    else{
        
        console.log(rpta);
        res.json({status:rpta});
    }

};

DetallePeriodoCtrl.deleteDetallePeriodo = async (req,res)=> {

    const id=req.params.id;
    const detallePeriodo=await DetallePeriodo.findById(id);
    const NtaExist= await Nota.find({nroClo:detallePeriodo._id});

    if(NtaExist.length==0){ // Si no hay notas se puede eliminar
        await DetallePeriodo.findByIdAndRemove(id);
        console.log("Se puede eliminar");
        res.json({status:200}); 
    }
    else{ // Si hay notas no se puede eliminar
        console.log("No se puede eliminar");
        res.json({status:500}); 
    }

};

DetallePeriodoCtrl.getDetallePeriodo = async(req, res) =>{

    const idPrd= req.params.idPrd;
    const detallePeriodo = await DetallePeriodo.find({
        prdCod :idPrd
    })
    .populate("prdCod")
    .populate("tpoPrdCod")
    .populate("estCod").sort('detPrdIni');

    console.log(detallePeriodo);

    res.json(detallePeriodo);
}

DetallePeriodoCtrl.getDetPrdSegunFch = async(req, res) =>{
    console.log("getDetPrdSegunFch");
    const idPrd= req.params.idPrd;
    const detallePeriodo = await DetallePeriodo.find({
        prdCod :idPrd
    })
    .populate("prdCod")
    .populate("tpoPrdCod")
    .populate("estCod").sort('detPrdIni');

    var arrayDetPrd=[];

    let fechaActual = new Date();
    var anioActual  =fechaActual.getFullYear();
    var mesActual   =fechaActual.getMonth()+1;
    var diaActual   =fechaActual.getDate();

    console.log(fechaActual);

    if(mesActual<10){
        mesActual="0"+mesActual
    }

    fch=anioActual+"-"+mesActual +"-"+diaActual;
    const parseFchIni=Date.parse(fch);
    var fechaDelDia=new Date(parseFchIni);
    console.log(fechaDelDia);

    for(var i=0;i<detallePeriodo.length;i++){
        if(detallePeriodo[i].detPrdIni<fechaDelDia){
            arrayDetPrd.push(detallePeriodo[i]);
        }
    }
    


    res.json(arrayDetPrd);
}

DetallePeriodoCtrl.getCicloActual= async(req, res) =>{
    const idPrd= req.params.idPrd;

    let fechaActual = new Date();
    var anioActual  =fechaActual.getFullYear();
    var mesActual   =fechaActual.getMonth()+1;
    var diaActual   =fechaActual.getDate();

    if(mesActual<10){
        mesActual="0"+mesActual
    }

    fch=anioActual+"-"+mesActual +"-"+diaActual;
    const parseFchIni=Date.parse(fch);
    var fechaDelDia=new Date(parseFchIni);

    console.log(anioActual);
    console.log(mesActual);
    console.log(diaActual);
    console.log("Esta es la fecha del dia");
    console.log(fechaDelDia);
    const detallePeriodo = await DetallePeriodo.find({
        prdCod :idPrd
    });

    console.log(detallePeriodo);

    for(var i=0;i<detallePeriodo.length;i++){

        

        if(fechaDelDia>=detallePeriodo[i].detPrdIni && fechaDelDia<=detallePeriodo[i].detPrdFin){

            var objCiclo={
                _id:detallePeriodo[i]._id,
                detPrdSgt:detallePeriodo[i].detPrdSgt,              
                detPrdIni:detallePeriodo[i].detPrdIni,
                detPrdFin:detallePeriodo[i].detPrdFin,
            }
        }
        else{
            console.log("esta fuera de las fechas");
        }
    }
    res.json(objCiclo);
}

module.exports = DetallePeriodoCtrl;


