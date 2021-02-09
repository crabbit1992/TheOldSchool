const HistorialRegistro = require('../model/HistorialRegistro');
const HistorialRegistroCtrl = {};

HistorialRegistroCtrl.getHistorialRegistros = async (req, res) => {
    const historialregistro = await HistorialRegistro.find();
    console.log(historialregistro);
    res.json(historialregistro);
};

HistorialRegistroCtrl.createHistorialRegistro = async (req, res) => {
    const historialregistro=new  HistorialRegistro(req.body);
    await historialregistro.save();
    res.json({status:200});
};

HistorialRegistroCtrl.getHistorialRegistro = async (req, res) => {
    const historialregistro= await HistorialRegistro.findById(req.params.id);
    console.log(historialregistro);
    res.json(historialregistro); 
};


module.exports = HistorialRegistroCtrl;