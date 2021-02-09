const NucleoCurso = require('../model/NucleoCurso');
const NucleoCursoCtrl = {};


NucleoCursoCtrl.getNucleoCursos = async (req, res) => {

    const nucleoCurso = await NucleoCurso.find().sort( { areCod: 1 } )
    .populate("areCod");
    res.json(nucleoCurso); 
};

NucleoCursoCtrl.getNucleoCursoArea = async (req, res) => {

    const areCod=req.params.areCod;

    const nucleoCurso = await NucleoCurso.find({areCod: areCod})
    .populate("areCod");
    res.json(nucleoCurso); 
};

NucleoCursoCtrl.createNucleoCurso = async (req, res) => {
    const GetParam = {
        areCod:    req.body.areCod,
        ncoCurNom: req.body.ncoCurNom.toUpperCase(),
        ncoCurDes: req.body.ncoCurDes,
    }

    console.log(GetParam);

    await NucleoCurso.findOne({ ncoCurNom: GetParam.ncoCurNom},async function(err, curso){

        if(curso){
            res.json({status:510});
        }
        else{
            const newNucleoCurso=new NucleoCurso(GetParam);
            await newNucleoCurso.save();   // se crea un nuevo registro en el documento  
            res.json({status:200});
        }

    });
};

NucleoCursoCtrl.editNucleoCurso = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        ncoCurNom: req.body.ncoCurNom,
    }

    await NucleoCurso.findOne({ ncoCurNom: GetParam.ncoCurNom},async function(err, curso){

        if(curso){
            console.log(curso);

            if(curso._id==id){
                await NucleoCurso.findByIdAndUpdate(id,{$set:GetParam});
                res.json({status:200});
            }
            else{
                res.json({status:400});
            }

        }
        else{
        
            await NucleoCurso.findByIdAndUpdate(id,{$set:GetParam});
            res.json({status:200});
          
        }
    });

};

NucleoCursoCtrl.deleteNucleoCurso = async (req,res)=> {

    await NucleoCurso.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = NucleoCursoCtrl;