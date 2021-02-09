const Persona = require('../model/Persona');
const bcrypt = require('bcryptjs');
const PersonaCtrl = {};

PersonaCtrl.getPersonas = async (req, res) => {
    const persona = await Persona.find();
    console.log(persona);
    res.json(persona);
};

PersonaCtrl.createPersona = async (req, res) => { //Crear Persona

    const newPersona={
        perRep_Id:req.body.perRep_Id,
        perNom:req.body.perNom,
        perApe:req.body.perApe,
        perDni:req.body.perDni,
        perCorreo:req.body.perCorreo,
        perPas:bcrypt.hashSync(req.body.perPas),
        perFchNac:req.body.perFchNac,
        perDir:req.body.perDir,
        perSex:req.body.perSex,
    }
    
    const perCorreo = await Persona.findOne({ perCorreo: req.body.perCorreo });
    const perDni = await Persona.findOne({ perDni: req.body.perDni });
    
    if(perDni!=undefined){
        res.json({ status: 522 });
    }
    else if(perCorreo!=undefined){
        res.json({ status: 521 });
    }
    else{
        console.log("Entro aqui");
        const persona=new  Persona(newPersona); 
        await persona.save();

        /*
        const dataUser = {
                perRep_id  : persona.perRep_id,
                dni : persona.perDni,
                accessToken: token.createToken,
        }
        */
        res.json({ status: 200 });
    }   
};

PersonaCtrl.getPersona = async (req, res) => {
    const persona= await Persona.findById(req.params.id);
    console.log(persona);
    res.json(persona); 
};
/**
PersonaCtrl.getPersonaDni = async (req, res) => {

    const Getdni = {
        dni: req.params.perDni
    }

    const persona = await Persona.findOne({ perRepDni: Getdni.dni });
    res.json(persona);
};
*/

PersonaCtrl.editPersona = async (req,res)=> {
    const {id}=req.params;
    const persona={
        perNom:req.body.perNom,
        perApe:req.body.perApe,
        perDni:req.body.perDni,
        perCorreo:req.body.perCorreo,
        perPas:req.body.perPas,
        perFchNac:req.body.perFchNac,
        perDir:req.body.perDir,
        perSex:req.body.perSex,
    }

    if(persona.perNom==null||persona.perApe==null) //En caso venga el nombre vacio se da por entendido que se quiere eliminar la persona
    {
        const persona={
            estCod:"5e0a89d09644411040ebf291" //id del documento estado que se refiere a una baja temporal(Inactivo)
        }
        await Persona.findByIdAndUpdate(id,{$set:persona});
        res.json({status: 200 });
    }
    else  // caso contrario se actualiza los datos de la persona
    {
        await Persona.findByIdAndUpdate(id,{$set:persona});
    res.json({status: 200 });
    } 
};

PersonaCtrl.removePersona = async (req,res)=> {
    const {id}=req.params;
    
        await Persona.findByIdAndRemove(id);
        res.json({status: 200 });
};

module.exports = PersonaCtrl;