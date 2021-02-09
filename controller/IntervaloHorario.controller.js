const IntervaloHorario = require('../model/IntervaloHorario');
const IntervaloHorarioCtrl = {};

IntervaloHorarioCtrl.getIntervaloHorario = async (req, res) => {

    GP={
        colCod:req.params.colCod
    }

    const itvHro = await IntervaloHorario.find({colCod: GP.colCod}).sort('intHraIni');
    res.json(itvHro);
};

IntervaloHorarioCtrl.createIntervaloHorario = async (req, res) => {

    console.log("entro a crear");
    const GP = {
        intHraIni: req.body.intHraIni,
        intHraFin: req.body.intHraFin,
        colCod:    req.body.colCod,
    }

    GP.intHraIni = new Date('1/1/1990'+' '+GP.intHraIni);
    GP.intHraFin = new Date('1/1/1990'+' '+GP.intHraFin);

    const itvloHorario = await IntervaloHorario.find({$and:[{
        colCod: GP.colCod,
    }]});

            if(itvloHorario!=undefined){
                var intHroExist=0;
             
                for(var i=0;i<itvloHorario.length;i++){
                    var Fecha= new Date(itvloHorario[i].intHraIni);
                    var FechaFin= new Date(itvloHorario[i].intHraFin);

                    if( GP.intHraIni.getTime()>=Fecha.getTime()  &&  GP.intHraIni.getTime()<=FechaFin.getTime() ){
                        console.log("Fecha de inicio ya ocupada");
        
                        intHroExist=intHroExist+1;
                    } 
                }
    
                console.log("se repitio? " +intHroExist);
                if(i==itvloHorario.length){
                    
                    if(intHroExist==0){
                        // Registrar Nuevo intervalo
                        console.log("Se puede registrar");
                        const newIntervaloHorario=new IntervaloHorario(GP);
                        await newIntervaloHorario.save();   // se crea un nuevo registro en el documento  
                        res.json({status:200});
                    }
                    else{
                        // No se puede Registrar intervalo
                        console.log("Ne puede registrar");
                        res.json({status:510});
                    }    
                }
            }
            else{
                const newIntervaloHorario=new IntervaloHorario(GP);
                await newIntervaloHorario.save();   // se crea un nuevo registro en el documento  
                res.json({status:200});
            }
};

IntervaloHorarioCtrl.editIntervaloHorario = async (req,res)=> {

    console.log("Entro a editar");
    const {id}=req.params;
    const GP={
        intHraIni: req.body.intHraIni,
        intHraFin: req.body.intHraFin,
        colCod:    req.body.colCod,
    }

    GP.intHraIni = new Date('1/1/1990'+' '+GP.intHraIni);
    GP.intHraFin = new Date('1/1/1990'+' '+GP.intHraFin);
    

    const itvloHorario = await IntervaloHorario.find({$and:[{
        colCod: GP.colCod,
    }]});

    console.log("tamaño del array es  :"+itvloHorario.length);

    if(itvloHorario!=undefined){
        var intHroExist=0;
     
        for(var i=0;i<itvloHorario.length;i++){
            var FechaIni= new Date(itvloHorario[i].intHraIni);
            var FechaFin= new Date(itvloHorario[i].intHraFin);


            console.log(i);
            if( GP.intHraIni.getTime()>FechaIni.getTime()  &&  GP.intHraIni.getTime()<FechaFin.getTime()){
                console.log("Fecha de inicio ya ocupada");
                console.log(GP.intHraIni.getTime());
                console.log(FechaIni.getTime());
                intHroExist=intHroExist+1;
            }
           
            
        }

        console.log("se repitio? :" +intHroExist);

        if(i==itvloHorario.length){
            console.log(" i dentro del if es es = :" +i);
            if(intHroExist==0){
                // Actualizar intervalo
                console.log("Se puede actualizar");
                await IntervaloHorario.findByIdAndUpdate(id,{$set:GP});
                res.json({status:200});
            }
            else{
                // No se puede actualizar intervalo
                console.log("Ne puede actualizar");
                res.json({status:510});
            }    
        }
    }
};

IntervaloHorarioCtrl.deleteIntervaloHorario = async (req,res)=> {

    await IntervaloHorario.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = IntervaloHorarioCtrl;