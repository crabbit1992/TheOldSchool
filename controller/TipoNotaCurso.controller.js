const TipoNotaCurso = require('../model/TipoNotaCurso');
const Periodo = require('../model/Periodo');
const Nota = require('../model/Nota');

const TipoNotaCursoCtrl = {};

TipoNotaCursoCtrl.getTipoNotaCurso= async (req, res) => {

    const GP={
        aulVirCod:req.params.aulVirCod,
        curCod:req.params.curCod,
        colCod:req.params.colCod,
    }

    console.log("Tipo nota curso");

    var tipoNotaCurso=[];

    let fechaActual = new Date();
    let anioActual  =fechaActual.getFullYear();
    console.log(anioActual);
    const periodo= await Periodo.findOne({ prdAnio: anioActual, colCod: GP.colCod});
    console.log(periodo);


    if(periodo){
        console.log("Entro aca");
        tipoNotaCurso = await TipoNotaCurso.find({$and:[{ 
            aulVirCod: GP.aulVirCod,
            curCod: GP.curCod,
            colCod: GP.colCod,
            prdCod: periodo._id
        }]})
        .populate("tpoNtaCod");
        console.log(tipoNotaCurso);
        res.json(tipoNotaCurso);
    }
    else{
        res.json(tipoNotaCurso);
    }   

}



TipoNotaCursoCtrl.createTipoNotaCurso= async (req, res) => {

    const GP={
        tpoNtaCod:req.body.tpoNtaCod,
        aulVirCod:req.body.aulVirCod,
        curCod:req.body.curCod,
        colCod:req.body.colCod,
        prdCod:"",
    }

    let fechaActual = new Date();
    var anioActual=fechaActual.getFullYear().toString();
    var prdCod;

    const periodoActual= await Periodo.findOne({prdAnio: anioActual, colCod: GP.colCod})  
    console.log(periodoActual);  

    if(periodoActual!=undefined){  // Si hay un periodo en el año actual
        prdCod= periodoActual._id;
        GP.prdCod=prdCod;

        console.log("hay un periodo en este año");
        const existTipoNota = await TipoNotaCurso.findOne({$and:[{
            tpoNtaCod:   GP.tpoNtaCod,
            aulVirCod:   GP.aulVirCod,
            curCod:      GP.curCod,
            prdCod:      GP.prdCod,
        }]});

        if(existTipoNota!=undefined){
            res.json({status: 510 });
            console.log(existTipoNota);
        }
        else{
            console.log("entro axcaa");
            console.log(GP.prdCod);

            const tipoNotaCurso=new  TipoNotaCurso(GP);
            await tipoNotaCurso.save();
            res.json({status: 200 });

        }
    }
};


TipoNotaCursoCtrl.deleteTipoNotaCurso=async(req, res) => {

    const id= req.params.id;
    const tpoNota=await (await TipoNotaCurso.findById(id)).populate("tpoNotCurCod");

    const notas=await Nota.find({colCod:tpoNota.colCod, alvCod: tpoNota.aulVirCod, tpoNotCurCod: tpoNota._id});
    
    console.log(tpoNota);
    console.log(notas);

    
    if(notas.length>0){
       res.json({status: 400 });
       console.log("No se puede eliminar");
    }
    else{
        await TipoNotaCurso.findByIdAndRemove(req.params.id );
        res.json({status: 200 });
        console.log("Si se puede eliminar");
    }
    
    
}


module.exports = TipoNotaCursoCtrl;