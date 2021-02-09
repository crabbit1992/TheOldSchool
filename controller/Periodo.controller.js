const Periodo = require('../model/Periodo');
const Nota = require('../model/Nota');
const DetallePeriodo = require('../model/DetallePeriodo');
const PeriodoCtrl = {};

PeriodoCtrl.getPeriodos = async (req, res) => {
    const periodo = await Periodo.find()
    .populate('estCod');

    res.json(periodo);
};

PeriodoCtrl.getUltimoPrd = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod
    }
    const periodo= await Periodo.find({colCod: GetParam.colCod})

    const posicion=periodo.length-1
    const ultimoPrd= periodo[posicion]

    res.json(ultimoPrd);
};

PeriodoCtrl.createPeriodo = async (req, res) => {

    const GP = {
        prdFchIni: req.body.prdFchIni,
        prdFchFin: req.body.prdFchFin,
        tpoPrdCod: req.body.tpoPrdCod,
        colCod: req.body.colCod,
        prdAnio: req.body.prdAnio,
    }

    
    var rpta=0;
    const prdoExist = await Periodo.findOne({prdAnio: GP.prdAnio, colCod: GP.colCod});
    const periodo = await Periodo.find({colCod: GP.colCod});
   

    if(prdoExist!=undefined){ // Si existe un periodo con el año que indica el objeto
        rpta=510
    }
    else{  
        console.log("entro al else");
        
        const parseGpIni=Date.parse(GP.prdFchIni); 
        const parseGpFin=Date.parse(GP.prdFchFin); 
        const fechaIniGP = new Date(parseGpIni);
        const fechaFinGP = new Date(parseGpFin);

        console.log(fechaIniGP);
        console.log(fechaFinGP);
    
        var anioIni=fechaIniGP.getUTCFullYear();
        var mesIni=fechaIniGP.getUTCMonth()+1;
        var diaIni=fechaIniGP.getUTCDate();

        var anioFin=fechaFinGP.getUTCFullYear();
        var mesFin=fechaFinGP.getUTCMonth()+1;
        var diaFin=fechaFinGP.getUTCDate();

        function validarFecha(){
            var trueOrFalse=0;
    
            if(GP.prdFchIni.substring(0,4)!=anioIni){
                trueOrFalse=508;
            }
            else if(GP.prdFchIni.substring(5,7)!=mesIni){
                trueOrFalse=508;
            }
            else if(GP.prdFchIni.substring(8,10)!=diaIni){
                trueOrFalse=508;
            }
            else if(GP.prdFchFin.substring(0,4)!=anioFin){
                trueOrFalse=509;
            }
            else if(GP.prdFchFin.substring(5,7)!=mesFin){
                trueOrFalse=509;
            }
            else if(GP.prdFchFin.substring(8,10)!=diaFin){
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
        else{

            if(periodo.length==0){
                
                if(fechaIniGP>fechaFinGP){//Validar que fecha inicio no sea mayor que la de fin
                    rpta=521;
                }
                else if(fechaFinGP<fechaIniGP){
                    rpta=521;
                }
                else{
                    rpta=200;
                }
                
            }
            else{
    
                if(fechaIniGP>fechaFinGP){//Validar que fecha inicio no sea mayor que la de fin 
                    rpta=521;
                }
                else{
    
                    
                    for(var i=0;i<periodo.length;i++){
                        
                        
                        if(fechaFinGP>=periodo[i].prdFchIni && fechaFinGP<=periodo[i].prdFchFin){
                            rpta=513;
                            
                        }
                        else if(fechaIniGP>=periodo[i].prdFchIni && fechaIniGP<=periodo[i].prdFchFin){
                            rpta=512; 
                        }
                        else{
                            rpta=200;
                        }
                    }
                }
            }
        }
    }

    if(rpta==200){
        const periodo=new  Periodo(GP);
        await periodo.save();
        console.log(rpta);
        res.json({status:rpta});
    }
    else{
        console.log("ssssww");
        console.log(rpta);
        res.json({status:rpta});
    }
    
};

PeriodoCtrl.getPeriodoActual = async (req, res) => {

    const GetParam = {
        prdAnio: req.params.prdAnio,
        colCod: req.params.colCod,
    }

    const periodo = await Periodo.find({$and:[{ prdAnio: GetParam.prdAnio,colCod: GetParam.colCod }]})
    .populate('colCod')
    .populate('estCod');
    console.log(GetParam);
    res.json(periodo); 
};


PeriodoCtrl.getPeriodosColegio = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod
    }
    const periodo= await Periodo.find({colCod: GetParam.colCod})
    .populate('estCod')
    .populate('tpoPrdCod');

    let fechaActual = new Date();
    var anioActual  =fechaActual.getFullYear();
    var mesActual   =fechaActual.getMonth()+1;
    var diaActual   =fechaActual.getDate();

    if(mesActual<10){
        mesActual="0"+mesActual
    }
    if(diaActual<10){
        diaActual="0"+diaActual
    }

    fch=anioActual+"-"+mesActual +"-"+diaActual;
    const parseFchIni=Date.parse(fch);
    var fechaDelDia=new Date(parseFchIni);
    console.log(fechaDelDia);

    for(let i=0;i<periodo.length;i++){
        if(periodo[i].prdFchFin<fechaActual && periodo[i].estCod=="5e0a8a3b9644411040ebf292"){
            await Periodo.updateOne({_id:periodo[i]._id},{estCod: "5e0a8a479644411040ebf293"});
        }
    }

    res.json(periodo); 
};

PeriodoCtrl.editPeriodo = async (req,res)=> {
    const {id}=req.params;
    const GP={
        prdFchIni:  req.body.prdFchIni,
        prdFchFin:  req.body.prdFchFin,
        tpoPrdCod:  req.body.tpoPrdCod,
        prdCod   :  req.body._id,
    }
    console.log(GP);
    
    var prdExist= await Periodo.findOne({_id:id});
    var detallePeriodo= await DetallePeriodo.find({prdCod:id}).sort('detPrdIni');
    var NtaExist= await Nota.find({prdCod:GP.prdCod}).populate("nroClo");
    const periodo = await Periodo.find({colCod: prdExist.colCod});
    console.log("Este es el  prdExist : "+prdExist);
    console.log("Este es el  colegio : "+prdExist.colCod._id);
    console.log("Este es el  array de periodos : "+periodo.length);
    // Validar la fechas
 

    var rpta=0;
    const parseGpIni=Date.parse(GP.prdFchIni); 
    const parseGpFin=Date.parse(GP.prdFchFin); 
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

        if(GP.prdFchIni.substring(0,4)!=anioIni){
            trueOrFalse=508;
        }
        else if(GP.prdFchIni.substring(5,7)!=mesIni){
            trueOrFalse=508;
        }
        else if(GP.prdFchIni.substring(8,10)!=diaIni){
            trueOrFalse=508;
        }
        else if(GP.prdFchFin.substring(0,4)!=anioFin){
            trueOrFalse=509;
        }
        else if(GP.prdFchFin.substring(5,7)!=mesFin){
            trueOrFalse=509;
        }
        else if(GP.prdFchFin.substring(8,10)!=diaFin){
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
        
        //* Validar fechas que no sean mayores que la fecha de inicio de detalle y que la fecha final no sea menor que la del detalle//       
        if(fechaIniGP>fechaFinGP){
            rpta=521;
        }
        else{

            if(periodo==undefined){
                rpta=200;
            }
            else{
                
                /** Eliminar el objeto que va a ser editado del array de detalles */

                if(periodo.length>1){
                    for(var h=0;h<periodo.length;h++){
                        if(periodo[h]._id.toString()==prdExist._id.toString()){
                            periodo.splice(h,1)
                        }
                    }
                }

                

                /****************************************************************** */
                console.log(periodo);
                if(periodo.length==0){
                    rpta=200;
                    if(detallePeriodo==undefined){
                        rpta=200;
                    }
                    else{
                        
                        const ultimoDetPrd=detallePeriodo.length-1;

                        if(fechaIniGP>detallePeriodo[0].detPrdIni){
                            rpta=514;
                        }
                        else if(fechaFinGP<detallePeriodo[ultimoDetPrd].detPrdFin){
                            rpta=515;
                        }
                        else{

                            if(NtaExist!=undefined){
                                
                                if(NtaExist[0].nroClo.tpoPrdCod.toString()===GP.tpoPrdCod.toString()){
                                    rpta=200;
                                }
                                else{
                                    rpta=400;
                                } 
                            }
                            else if(GP.tpoPrdCod.toString()==prdExist.tpoPrdCod.toString()){
                                rpta=200;
                            }
                            else{
                                rpta=201;
                            }
                        }
                    }
                    console.log("Paso");
                }
                else{

                    if(periodo.length>1){
                        for(var i=0;i<periodo.length;i++){
                        
                            if(fechaFinGP>=periodo[i].prdFchIni && fechaFinGP<=periodo[i].prdFchFin){
                                rpta=513;
                            }
                            else if(fechaIniGP>=periodo[i].prdFchIni && fechaIniGP<=periodo[i].prdFchFin){
                                console.log("11212");
                                if(fechaIniGP>=periodo[i].prdFchIni){                      
                                    rpta=512;
                                }
                                else{
                                    rpta=200;
                                }
                            }
                            else{
                                
                                if(detallePeriodo==undefined){
                                    rpta=200;
                                }
                                else{
                                    
                                    const ultimoDetPrd=detallePeriodo.length-1;
    
                                    if(fechaIniGP>detallePeriodo[0].detPrdIni){
                                        rpta=514;
                                    }
                                    else if(fechaFinGP<detallePeriodo[ultimoDetPrd].detPrdFin){
                                        rpta=515;
                                    }
                                    else{
    
                                        if(NtaExist!=undefined){
                                            
                                            if(NtaExist[0].nroClo.tpoPrdCod.toString()===GP.tpoPrdCod.toString()){
                                                rpta=200;
                                            }
                                            else{
                                                rpta=400;
                                            } 
                                        }
                                        else if(GP.tpoPrdCod.toString()==prdExist.tpoPrdCod.toString()){
                                            rpta=200;
                                        }
                                        else{
                                            rpta=201;
                                        }
                                    }
                                }
                            }
                        } 
                    }
                    else{
                        console.log("entro aaaaaaa");
                        rpta=200;
                    }
                    
                    


                }
            } 
        }
    } 

 
    if(rpta==200){
        console.log(rpta);
        await Periodo.findByIdAndUpdate(id,{$set:GP});
        res.json({status:rpta});
    }
    else if(rpta==201){
        console.log(rpta);
        await Periodo.findByIdAndUpdate(id,{$set:GP});
        await DetallePeriodo.remove({prdCod:GP.prdCod});
        res.json({status:rpta});
    }
    else{
        console.log("cayo aca");
        console.log(rpta);
        res.json({status:rpta});
    }
};


PeriodoCtrl.deletePeriodo = async (req,res)=> {

    await Periodo.findByIdAndRemove(req.params.id);
    res.json({status:200});
};


module.exports = PeriodoCtrl;