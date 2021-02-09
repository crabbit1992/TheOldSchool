const Promedio = require('../model/Promedio');
const PromedioCtrl = {};

PromedioCtrl.getPromedioCiclo = async (req, res) => {

    const GP={
        alvCod: req.params.alvCod,
        nroClo: req.params.nroClo,
        curCod: req.params.curCod
    }
    console.log("buscar promedios");

    const promedios = await Promedio.find({$and:[{ 
        alvCod: GP.alvCod,
        nroClo: GP.nroClo,
        curCod: GP.curCod
    }]})
    .populate('perRepCod')

    res.json(promedios);
};

PromedioCtrl.getPromedioCursosPorArea = async (req, res) => {

    const GP={
        perRepCod: req.params.perRepCod,
        nroClo: req.params.nroClo,
        areCod: req.params.areCod,
    }

    const promedios = await Promedio.find({$and:[{ 
        perRepCod: GP.perRepCod,
        nroClo: GP.nroClo,
        areCod: GP.areCod,
    }]})
    .populate('curCod')

    res.json(promedios);
};

PromedioCtrl.deletePromedio = async (req,res)=> {

    await Promedio.remove({perRepCod:"5fb371ad588ae804b8ec30a8"});
    res.json({status:200});
};





module.exports = PromedioCtrl;