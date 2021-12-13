const Persona = require('../model/Persona');
const RecoveryPass = require('../model/RecoveryPass');
const bcrypt = require('bcryptjs');
const token= require('../services/token.controller');
const PersonaCtrl = {};
const nodemailer = require("nodemailer");

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

PersonaCtrl.enviarCorreo= async(req, res)=>{

  console.log("entro a enviar correo");

  var correo = req.body.correo;
  console.log(correo);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'hernanriosvalencia92@gmail.com', // generated ethereal user
      pass: 'aybcwyjqemoauboy', // generated ethereal password
    },
  });

  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
  var codigo = "";
  for (i=0; i<20; i++) codigo +=caracteres.charAt(Math.floor(Math.random()*caracteres.length)); 
  console.log(codigo)



  const info= await transporter.sendMail({
    from: '"Has olvidado tu contraseña 👻" <hernanriosvalencia92@gmail.com>', // sender address
    to: correo, // list of receivers
    subject: "Has olvidado tu contraseña 👻", // Subject line
    text: "Hello world?", // plain text body
    html: 
    `
    <b>Tu codigo para reestablecer tu contraseña es : ${codigo} </b>
    `
  });
  if(info){
    console.log("se envio el correooooo");

    const objRecoveryPass={
      correo: correo,
      codigo: codigo
    }

    const recoveryDocExist= await RecoveryPass.findOne({correo: objRecoveryPass.correo});
    if(recoveryDocExist){
      await RecoveryPass.deleteOne({_id: recoveryDocExist._id});
      console.log("elimino un documento");
    }

    const newRecoveryPass=new RecoveryPass(objRecoveryPass);
    const result = await newRecoveryPass.save();   // se crea un nuevo registro en el documento  
    const resultados = await RecoveryPass.find();   // se crea un nuevo registro en el documento  
    console.log(result);
    console.log(resultados);
    res.json({status:200});
  }

};

module.exports = PersonaCtrl;
