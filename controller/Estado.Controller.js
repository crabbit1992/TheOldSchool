const { set } = require('mongoose');
const Estado = require('../model/Estado');
const EstadoCtrl = {};

EstadoCtrl.getEstados = async (req, res) => {
    const estado = await Estado.find();
    console.log(estado);

    res.json(estado);
};


EstadoCtrl.createEstado = async (req, res) => {
    const estado=new  Estado(req.body);
    await estado.save();
    res.json({status:200});
};

EstadoCtrl.getEstado = async (req, res) => {
    const estado= await Estado.findById(req.params.id);
    console.log(estado);
    res.json(estado); 
};

EstadoCtrl.editEstado = async (req,res)=> {
    const {id}=req.params;
    const estado={
        estCod:req.body.estCod,
        estNom:req.body.estNom,
        estDes:req.body.estDes,
    }
    await Estado.findByIdAndUpdate(id,{$set:estado});
    res.json({status:200});
};

EstadoCtrl.deleteEstados = async (req,res)=> {
    await Estado.findByIdAndRemove(req.params.id);
    res.json({status:200});

};

module.exports = EstadoCtrl;