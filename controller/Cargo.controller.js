const Cargo = require('../model/Cargo');
const CargoCtrl = {};

CargoCtrl.getCargos = async (req, res) => {
    const cargo = await Cargo.find();
    console.log(cargo);

    res.json(cargo);
};

CargoCtrl.createCargo = async (req, res) => {
    const cargo=new  Cargo(req.body);
    await cargo.save();
    res.json({ status:200 });
};

CargoCtrl.getCargo = async (req, res) => {
    const cargo= await Cargo.findById(req.params.id);
    console.log(cargo);
    res.json(cargo); 
};

CargoCtrl.editCargo = async (req,res)=> {
    const {id}=req.params;
    const cargo={
        carNom:req.body.carNom,
        carDes:req.body.carDes,
    }
    await Cargo.findByIdAndUpdate(id,{$set:cargo});
    res.json({ status:200 });
};

CargoCtrl.deleteCargo = async (req,res)=> {

    await Cargo.findByIdAndRemove(req.params.id);
    res.json({ status: 200 }); 
};

module.exports = CargoCtrl;