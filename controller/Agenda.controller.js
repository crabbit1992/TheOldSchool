const Agenda = require('../model/Agenda');
const AgendaCtrl = {};

AgendaCtrl.getAgenda = async (req, res) => {

    console.log("agenda unicaa");
    const {id}=req.params;

    const agenda = await Agenda.findOne({_id:id})

    res.json(agenda);
};

AgendaCtrl.getAgendas = async (req, res) => {

    const alvCod=req.params.alvCod;
    const curCod=req.params.curCod.toString();

    const agenda = await Agenda.find({alvCod:alvCod, ageCur:curCod})
    .populate('ageCur').populate('estCod');
   
    res.json(agenda);
};

AgendaCtrl.getAgendasAula = async (req, res) => {

    const alvCod=req.params.alvCod;

    const agenda = await Agenda.find({alvCod:alvCod})
    .populate('ageCur').populate('estCod');
   
    res.json(agenda);
};

AgendaCtrl.postAgenda = async (req, res) => {

    let GP={
    ageTtl:req.body.ageTtl,
    ageDes:req.body.ageDes,
    ageCre:req.body.ageCre, //Creador
    ageCur:req.body.ageCur,
    alvCod:req.body.alvCod,
    colCod:req.body.colCod,
    }

    const newAgenda=new Agenda(GP);
    await newAgenda.save();  
    res.json({status:200}); 

};

AgendaCtrl.editAgenda = async (req, res) => {

    const {id}=req.params;

    let GP={
        ageTtl:req.body.ageTtl,
        ageDes:req.body.ageDes,
        ageCre:req.body.ageCre, //Creador
        ageCur:req.body.ageCur,
        alvCod:req.body.alvCod,
        colCod:req.body.colCod,
    }

    await Agenda.findByIdAndUpdate(id,{$set:GP});
    res.json({status: 200}); 
};

module.exports = AgendaCtrl;