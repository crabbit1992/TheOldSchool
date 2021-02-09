const PersonaRepositorio = require('../model/PersonaRepositorio');
const PersonaRepositorioCtrl = {};


PersonaRepositorioCtrl.getPersonas = async (req, res) => {
    const persona = await PersonaRepositorio.find();
    res.json(persona);
};

PersonaRepositorioCtrl.getPersonaById = async (req, res) => {
    console.log("entroooooosss");
 
    const perRepCod= req.params.id
    console.log(perRepCod);
  
    const persona = await PersonaRepositorio.findOne({_id:perRepCod});
    res.json(persona);
};

PersonaRepositorioCtrl.getPersonaDni = async (req, res) => {

    const Getdni = {
        dni: req.params.perRepDni
    }

    const persona = await PersonaRepositorio.findOne({ perRepDni: Getdni.dni });
    res.json(persona);
};

PersonaRepositorioCtrl.createPersona = async (req, res) => { //Crear Persona

    const newPersona = {
        perRepNom: req.body.perRepNom,
        perRepApe: req.body.perRepApe,
        perRepDni: req.body.perRepDni,
        perRepFchNac: req.body.perRepFchNac,
        perRepDir: req.body.perRepDir,
        perRepSex: req.body.perRepSex,
    }

    const persona = await PersonaRepositorio.findOne({ perRepDni: req.body.perRepDni });
    if(persona!=undefined){
        res.json({status: 510 });
    }else{
        const personaRepositorio = new PersonaRepositorio(newPersona);
        await personaRepositorio.save();
        res.json({status: 200 });
    }   
};




PersonaRepositorioCtrl.editPersona = async (req, res) => {
    const { id } = req.params;
    const persona = {
        perRepNom: req.body.perRepNom,
        perRepApe: req.body.perRepApe,
        perRepDni: req.body.perRepDni,
        perRepFchNac: req.body.perRepFchNac,
        perRepDir: req.body.perRepDir,
        perRepSex: req.body.perRepSex,
    }

    if (persona.perRepNom === null || persona.perRepApe === null||persona.perRepNom === undefined || persona.perRepApe === undefined) //En caso venga el nombre vacio se da por entendido que se quiere eliminar la persona
    {
        const persona = {
            estCod:"5e0a89d09644411040ebf291" //id del documento estado que se refiere a una baja temporal(Inactivo)
        }
        await PersonaRepositorio.findByIdAndUpdate(id, { $set: persona });
        res.json({status: 200 });
    }
    else  // caso contrario se actualiza los datos de la persona
    {
        await PersonaRepositorio.findByIdAndUpdate(id, { $set: persona });
        res.json({status: 200 });
    }
};


PersonaRepositorioCtrl.deletePersonaRepositorio=async(req, res) => {
    const Getdni = {
        dni: req.params.perRepDni
    }

    await PersonaRepositorio.remove({ perRepDni: Getdni.dni });
    res.json({status: 200 });
    }

module.exports = PersonaRepositorioCtrl;