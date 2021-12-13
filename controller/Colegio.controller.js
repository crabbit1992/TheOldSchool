const Colegio = require('../model/Colegio');
const BioPortada = require('../model/BioPortada');
const ColegioCtrl = {};

ColegioCtrl.getColegios = async (req, res) => {
    const colegio = await Colegio.find() 
    .populate("colImgPfl");


    console.log(colegio);
    res.json(colegio);
};

/** Referente a la imagen de emblema del colegio */
ColegioCtrl.addEmblema = async (req, res) => {

    var GetParam = {
        colImgEmb:  req.body.colImgEmb,
        colCod:     req.body.colCod,
    }
    
    await Colegio.findByIdAndUpdate(GetParam.colCod,{$set:GetParam});
    res.json({status: 200}); 
};

ColegioCtrl.getEmblema = async (req, res) => {

    const {colCod}=req.params;

    const colegio= await Colegio.find({_id: colCod})
    .populate("colImgEmb");
    console.log(colegio);
    res.json(colegio); 
};

ColegioCtrl.editEmblema = async (req,res)=> {
    const {colCod}=req.params;
    var colegio={
        colImgEmb:req.body.colImgEmb,
    }   


    console.log(colegio);

    await Colegio.findByIdAndUpdate(colCod,{$set:colegio});
    res.json({status: 200}); 
};

/** Referente a la imagen de perfil del colegio */
ColegioCtrl.addImgPfl = async (req, res) => {
    console.log("gfgfgfgggggggg");
    var GetParam = {
        colImgPfl:  req.body.colImgPfl,
        colCod:    req.body.colCod,
    }

    console.log(req.body);
    console.log(GetParam);
    
    await Colegio.findByIdAndUpdate(GetParam.colCod,{$set:GetParam});
    res.json({status: 200}); 
};

ColegioCtrl.getImgPfl = async (req, res) => {

    const {colCod}=req.params;

    const colegio= await Colegio.find({_id: colCod})
    .populate("colImgPfl");

    res.json(colegio); 
};

ColegioCtrl.editImgPfl = async (req,res)=> {
    const {colCod}=req.params;
    var colegio={
        colImgPfl:req.body.colImgPfl,
    }   


    console.log(colegio);

    await Colegio.findByIdAndUpdate(colCod,{$set:colegio});
    res.json({status: 200}); 
};



ColegioCtrl.createColegio = async (req, res) => {

    var GetParam = {
        colNom: req.body.colNom,
        colRuc: req.body.colRuc,
    }

    let colUrl=GetParam.colNom.replace(/ /g, "")
 
    GetParam={
        colUrl:colUrl,
        colNom:req.body.colNom,
        colRuc:req.body.colRuc,
    }


    const colegioExist = await Colegio.findOne({$and:[{ colNom: GetParam.colNom,colRuc: GetParam.colRuc}]});

    if(colegioExist!=undefined){
        console.log(colegioExist);
        res.json({status: 510});
    }else{
        const newcolegio=new Colegio(GetParam);
        await newcolegio.save();   // se crea un nuevo registro en el documento  
        res.json({status: 200}); 
    }
};

ColegioCtrl.getColegio = async (req, res) => {

    const {colUrl}=req.params;

    const colegio= await Colegio.findOne({colUrl: colUrl})
    .populate("colImgEmb").populate("colImgPfl");
    console.log(colegio);
    res.json(colegio); 
};

ColegioCtrl.editColegio = async (req,res)=> {
    const {id}=req.params;
    var colegio={
        colNom:req.body.colNom,
        colRuc:req.body.colRuc,
    }   


    let colUrl=colegio.colNom.replace(/ /g, "")
 
    colegio={
        colUrl:colUrl,
        colNom:req.body.colNom,
        colRuc:req.body.colRuc,
    }

    console.log(colegio);

    await Colegio.findByIdAndUpdate(id,{$set:colegio});
    res.json({status: 200}); 
};

ColegioCtrl.DeshabilitarColegio = async (req,res)=> {
    const {id}=req.params;
    var colegio={
        estCod: "5e0a8a479644411040ebf293",
    }   

    await Colegio.findByIdAndUpdate(id,{$set:colegio});
    res.json({status: 200}); 
};


module.exports = ColegioCtrl;