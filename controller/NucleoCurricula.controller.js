const NucleoCurricula = require('../model/NucleoCurricula');
const NucleoCurriculaCtrl = {};


NucleoCurriculaCtrl.getNucleoCurriculas = async (req, res) => {

    const nucleoCurricula = await NucleoCurricula.find().sort( { areCod: -1 } )
    .populate("areCod").populate("curCod");
    res.json(nucleoCurricula); 
};

NucleoCurriculaCtrl.getNucleoCurriculaPrd = async (req, res) => {

    const prd=req.params.prd;
    

    const nucleoCurricula = await NucleoCurricula.find({prd: prd})
    .populate("areCod").populate("curCod");
    res.json(nucleoCurricula); 
};

NucleoCurriculaCtrl.getNucleoCurriculaPrdAreCod = async (req, res) => {

    const areCod=req.body.areCod;
    const prd=req.body.prd;
    
    if(prd!=null && areCod==null){
        console.log("prd");
        const nucleoCurricula = await NucleoCurricula.find({prd: prd})
        .populate("areCod").populate("curCod");
        res.json(nucleoCurricula); 
    }
    else if(areCod && prd){
        console.log("areCod && prd");
        const nucleoCurricula = await NucleoCurricula.find({prd: prd, areCod:areCod})
        .populate("areCod").populate("curCod");
        res.json(nucleoCurricula); 
    }

    
};

NucleoCurriculaCtrl.createNucleoCurricula = async (req, res) => {
    const GetParam = {
        prd:       req.body.prd,
        areCod:    req.body.areCod,
        curCod:    req.body.curCod,
    }

    console.log(GetParam);

    await NucleoCurricula.findOne({ curCod: GetParam.curCod},async function(err, curricula){

        if(curricula){
            res.json({status:510});
        }
        else{
            const newNucleoCurricula=new NucleoCurricula(GetParam);
            await newNucleoCurricula.save();   // se crea un nuevo registro en el documento  
            res.json({status:200});
        }

    });
};

NucleoCurriculaCtrl.editNucleoCurricula = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        prd:       req.body.prd,
        areCod:    req.body.areCod,
        curCod:    req.body.curCod,
    }

    await NucleoCurricula.findOne({ curCod: GetParam.curCod},async function(err, curricula){

        if(curricula){
            console.log(curricula);

            if(curricula._id==id){
                await NucleoCurricula.findByIdAndUpdate(id,{$set:GetParam});
                res.json({status:200});
            }
            else{
                res.json({status:400});
            }

        }
        else{
        
            await NucleoCurricula.findByIdAndUpdate(id,{$set:GetParam});
            res.json({status:200});
          
        }
    });

};

NucleoCurriculaCtrl.deleteNucleoCurricula = async (req,res)=> {

    await NucleoCurricula.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = NucleoCurriculaCtrl;