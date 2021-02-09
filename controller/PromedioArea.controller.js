const PromedioArea = require('../model/PromedioArea');
const DetallePeriodo = require('../model/DetallePeriodo');
const Matricula = require('../model/Matricula');
const PromedioAreaCtrl = {};


PromedioAreaCtrl.getPromedioArea = async (req,res)=> {

    console.log("entro al promedia de area");
    const GP={
        perRepCod:req.params.perRepCod,
        nroClo:req.params.nroClo,
    }

    const resPromedioArea = await PromedioArea.find({perRepCod: GP.perRepCod, nroClo: GP.nroClo})
    .populate("areCod");
    console.log(resPromedioArea);
    res.json(resPromedioArea);
};

PromedioAreaCtrl.getLibretaPrd= async (req,res)=> {

    const GP={
        perRepCod:req.params.perRepCod,
        prdCod:req.params.prdCod,
    }
    console.log("12121444");

    var matricula;

    console.log(GP);

    if(GP.prdCod=="undefined"){
        console.log(" Entro aca");
        matricula= await Matricula.find({perRepCod:GP.perRepCod})
        .populate("graCod").populate("nivCod")

        matricula=matricula[matricula.length-1];
        GP.prdCod=matricula.prdCod;
    }
    else{
        matricula= await Matricula.findOne({perRepCod:GP.perRepCod,prdCod:GP.prdCod})
        .populate("graCod").populate("nivCod")
    }



    var LibretaJSON=[];

    var LibretaBimestral={
        perRepCod:"",
        grado:{},
        nivel:{},
        area:{},
        primerBimestre:{
            nroClo:"",
            promedio:0
        },
        segundoBimestre:{
            nroClo:"",
            promedio:0
        },
        tercerBimestre:{
            nroClo:"",
            promedio:0
        },
        cuartoBimestre:{
            nroClo:"",
            promedio:0
        },
        promedioFinal:0,
    };

    var LibretaTrimestral={
        perRepCod:"",
        grado:{},
        nivel:{},
        area:{},
        primerTrimestre:{
            nroClo:"",
            promedio:0
        },
        segundoTrimestre:{
            nroClo:"",
            promedio:0
        },
        tercerTrimestre:{
            nroClo:"",
            promedio:0
        },
        promedioFinal:0,
    };

    // Buscar Todos los registros del alumno segun el periodo
    const promAreas= await PromedioArea.find({perRepCod: GP.perRepCod, prdCod: GP.prdCod})
    .populate("nroClo")
    .populate("areCod")
    .populate("prdCod")
    .sort (  { "areCod" :  1}  );

    if(promAreas.length==0){
        console.log("No hay ningun promedio");
        res.json(LibretaJSON);
        //No hay ningun promedio asignado al area
    }
    else if(promAreas[0].prdCod.tpoPrdCod=="5e0fcc56f34f19134cb315bd"){ //periodo trimestral

        for(var k=0; k<promAreas.length;k++){
        
            LibretaTrimestral.area=promAreas[k].areCod;
            LibretaTrimestral.perRepCod=promAreas[k].perRepCod;
            LibretaTrimestral.grado=matricula.graCod;
            LibretaTrimestral.nivel=matricula.nivCod;

            
            if(promAreas[k].nroClo.detPrdSgt=="Primer Trimestre"){
                LibretaTrimestral.primerTrimestre.promedio= promAreas[k].promedio;

                LibretaTrimestral.primerTrimestre.nroClo=promAreas[k].nroClo._id;
            }
            else if(promAreas[k].nroClo.detPrdSgt=="Segundo Trimestre"){
                LibretaTrimestral.segundoTrimestre.promedio=promAreas[k].promedio;
                LibretaTrimestral.segundoTrimestre.nroClo=promAreas[k].nroClo._id;
            }
            else if(promAreas[k].nroClo.detPrdSgt=="Tercer Trimestre"){
                LibretaTrimestral.tercerTrimestre.promedio=promAreas[k].promedio;
                LibretaTrimestral.tercerTrimestre.nroClo=promAreas[k].nroClo._id;
            }
           
    
            if(LibretaJSON.length==0){
    
                LibretaJSON.push(LibretaTrimestral)
            }
            else{

                var existeArea=false;
                var posicion=0;
    
                for(var i=0;i<LibretaJSON.length;i++){
                    if(LibretaJSON[i].area==LibretaTrimestral.area){
                        existeArea=true;
                        posicion=i;
                    }
                }

                if(existeArea==true){
                        
                    if(promAreas[k].nroClo.detPrdSgt=="Primer Trimestre"){
                        LibretaJSON[posicion].primerTrimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].primerTrimestre.nroClo=promAreas[k].nroClo._id;
                    }
                    else if(promAreas[k].nroClo.detPrdSgt=="Segundo Trimestre"){
                        LibretaJSON[posicion].segundoTrimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].segundoTrimestre.nroClo=promAreas[k].nroClo._id;
                    }
                    else if(promAreas[k].nroClo.detPrdSgt=="Tercer Trimestre"){
                        LibretaJSON[posicion].tercerTrimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].tercerTrimestre.nroClo=promAreas[k].nroClo._id;
                    }

                }
                else if(existeArea==false){
                    LibretaJSON.push(LibretaTrimestral) 
                }


            }
            LibretaTrimestral={
                perRepCod:"",
                grado:{},
                nivel:{},
                area:{},
                primerTrimestre:{
                    nroClo:"",
                    promedio:0
                },
                segundoTrimestre:{
                    nroClo:"",
                    promedio:0
                },
                tercerTrimestre:{
                    nroClo:"",
                    promedio:0
                },
                nroCloTercerTri:"",
                promedioFinal:0,
            };
        }
    
        var promFinal=0;
        for(let i=0;i<LibretaJSON.length;i++){
            promFinal=Math.round(
                (LibretaJSON[i].primerTrimestre.promedio +
                     LibretaJSON[i].segundoTrimestre.promedio +
                      LibretaJSON[i].tercerTrimestre.promedio)/3)
            LibretaJSON[i].promedioFinal=promFinal;
        }
        res.json(LibretaJSON);
    }
    else if(promAreas[0].prdCod.tpoPrdCod=="5e0fcc4ff34f19134cb315bc"){  //periodo bimestral

        console.log("Periodo Bimestral");
        
        for(var k=0; k<promAreas.length;k++){
        
            LibretaBimestral.area=promAreas[k].areCod;
            LibretaBimestral.perRepCod=promAreas[k].perRepCod;
            LibretaBimestral.grado=matricula.graCod;
            LibretaBimestral.nivel=matricula.nivCod;

            
            if(promAreas[k].nroClo.detPrdSgt=="Primer Bimestre"){
                LibretaBimestral.primerBimestre.promedio=promAreas[k].promedio;
                LibretaBimestral.primerBimestre.nroClo=promAreas[k].nroClo._id;
            }
            else if(promAreas[k].nroClo.detPrdSgt=="Segundo Bimestre"){
                LibretaBimestral.segundoBimestre.promedio=promAreas[k].promedio;
                LibretaBimestral.segundoBimestre.nroClo=promAreas[k].nroClo._id;
            }
            else if(promAreas[k].nroClo.detPrdSgt=="Tercer Bimestre"){
                LibretaBimestral.tercerBimestre.promedio=promAreas[k].promedio;
                LibretaBimestral.tercerBimestre.nroClo=promAreas[k].nroClo._id;
            }
            else if(promAreas[k].nroClo.detPrdSgt=="Cuarto Bimestre"){
                console.log(promAreas[k].nroClo._id);
                LibretaBimestral.cuartoBimestre.promedio=promAreas[k].promedio;
                LibretaBimestral.cuartoBimestre.nroClo=promAreas[k].nroClo._id;
            }
    
            if(LibretaJSON.length==0){
                LibretaJSON.push(LibretaBimestral)
                
            }
            else{
                var existeArea=false;
                var posicion=0;
    
                for(var i=0;i<LibretaJSON.length;i++){
                    if(LibretaJSON[i].area==LibretaBimestral.area){
                        existeArea=true;
                        posicion=i;
                    }
                }

                if(existeArea==true){

                    console.log("EXISTE AREA");
                        
                    if(promAreas[k].nroClo.detPrdSgt=="Primer Bimestre"){
                        LibretaJSON[posicion].primerBimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].primerBimestre.nroClo=promAreas[k].nroClo._id;
                    }
                    else if(promAreas[k].nroClo.detPrdSgt=="Segundo Bimestre"){
                        LibretaJSON[posicion].segundoBimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].segundoBimestre.nroClo=promAreas[k].nroClo._id;
                    }
                    else if(promAreas[k].nroClo.detPrdSgt=="Tercer Bimestre"){
                        LibretaJSON[posicion].tercerBimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].tercerBimestre.nroClo=promAreas[k].nroClo._id;
                    }
                    else if(promAreas[k].nroClo.detPrdSgt=="Cuarto Bimestre"){
                        LibretaJSON[posicion].cuartoBimestre.promedio=promAreas[k].promedio;
                        LibretaJSON[posicion].cuartoBimestre.nroClo=promAreas[k].nroClo._id;
                    }

                }
                else if(existeArea==false){
                    LibretaJSON.push(LibretaBimestral) 
                }

            }
            LibretaBimestral={
                area:"",
                primerBimestre:{
                    nroClo:"",
                    promedio:0
                },
                segundoBimestre:{
                    nroClo:"",
                    promedio:0
                },
                tercerBimestre:{
                    nroClo:"",
                    promedio:0
                },
                cuartoBimestre:{
                    nroClo:"",
                    promedio:0
                },
                promedioFinal:0,
            };
        }
    
        console.log(LibretaJSON)
        var promFinal=0;
        for(let i=0;i<LibretaJSON.length;i++){
            promFinal=Math.round(
                (LibretaJSON[i].primerBimestre.promedio +
                     LibretaJSON[i].segundoBimestre.promedio + 
                        LibretaJSON[i].tercerBimestre.promedio + 
                            LibretaJSON[i].cuartoBimestre.promedio)/4)
            LibretaJSON[i].promedioFinal=promFinal;
        }
    
  
        console.log(LibretaJSON);
        res.json(LibretaJSON);
    }


};



PromedioAreaCtrl.deletePromedioArea = async (req,res)=> {

    await PromedioArea.remove({perRepCod:"5fb371ad588ae804b8ec30a8"});

    res.json({status:200});
};







module.exports = PromedioAreaCtrl;