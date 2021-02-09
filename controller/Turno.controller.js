const Turno = require('../model/Turno');
const TurnoCtrl = {};

TurnoCtrl.getTurno = async (req, res) => {
    const turno = await Turno.find()
    res.json(turno); 
};

TurnoCtrl.createTurno = async (req, res) => {
    const GetParam = {
        turNom: req.body.turNom,
        turDes: req.body.turDes,
    }

    const TurnoExist = await Turno.findOne({ turNom: GetParam.turNom});

    if(TurnoExist!=undefined){
        console.log(TurnoExist);
        res.json({status: 510 });
    }
    else{
        const newTurno=new Turno(GetParam);
        await newTurno.save();   // se crea un nuevo registro en el documento  
        res.json({status: 200 });
    }
};

TurnoCtrl.editTurno = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        turDes: req.body.turDes,
    }
    await Turno.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status: 200 });
};

TurnoCtrl.deleteTurno = async (req,res)=> {

    await Turno.findByIdAndRemove(req.params.id);
    res.json({status: 200 });
};

module.exports = TurnoCtrl;