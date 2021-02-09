const Persona = require('../model/Persona');
const bcrypt = require('bcryptjs');
const token= require('../services/token.controller');
const PersonaCtrl = {};

PersonaCtrl.loginPersona= async(req, res)=>{
    const persona={
        perCorreo:req.body.perCorreo,
        perPas:req.body.perPas
    }

    console.log(persona);

       await Persona.findOne({ perCorreo: persona.perCorreo }, (err, user) => {
        if (err){ 
          console.log("Error 1");
          return res.json({status: 500 });
        };
    
        if (!user) {
          // email does not exist
          console.log("Error 2");
          return res.json({status: 419 });

        } else {

          const Password = bcrypt.decodeBase64(user.perPas);
          
          console.log(Password);
          const resultPassword = bcrypt.compareSync(persona.perPas, user.perPas);
          if (resultPassword) {
            console.log("Error 4");
            const dataUser = {
                    id:user._id,
                    idPerRep: user.perRep_Id,
                    accessToken: token.createToken(user),
            }
            return res.json({dataUser});

          } else {
            // password wrong
            console.log("Error 3");
            return res.json({status: 420 });
          }
        }
      });
};

module.exports = PersonaCtrl;
