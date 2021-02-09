const NucleoArea = require('../model/NucleoArea');
const NucleoAreaCtrl = {};

NucleoAreaCtrl.getNucleoArea = async (req, res) => {
    const nucleoArea = await NucleoArea.find().sort( { "ncoAreNom": 1} )
    res.json(nucleoArea); 
};

NucleoAreaCtrl.createNucleoArea = async (req, res) => {
    const GetParam = {
        ncoAreNom: req.body.ncoAreNom,
        ncoAreDes: req.body.ncoAreDes,
    }

    console.log(GetParam);

    await NucleoArea.findOne({ ncoAreNom: GetParam.ncoAreNom},async function(err, area){

        if(area){
            res.json({status:510});
        }
        else{
            const newNucleoArea=new NucleoArea(GetParam);
            await newNucleoArea.save();   // se crea un nuevo registro en el documento  
            res.json({status:200});
        }

    });
};

NucleoAreaCtrl.editNucleoArea = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        ncoAreNom: req.body.ncoAreNom,
    }

    await NucleoArea.findOne({ ncoAreNom: GetParam.ncoAreNom},async function(err, area){

        if(area){
            console.log(area);
            

            if(area._id==id){
                await NucleoArea.findByIdAndUpdate(id,{$set:GetParam});
                res.json({status:200});
            }
            else{
                res.json({status:400});
            }

        }
        else{
        
            await NucleoArea.findByIdAndUpdate(id,{$set:GetParam});
            res.json({status:200});
          
        }


    });


};

NucleoAreaCtrl.deleteNucleoArea = async (req,res)=> {

    await NucleoArea.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = NucleoAreaCtrl;