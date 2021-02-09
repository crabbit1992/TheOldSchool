const Curso = require('../model/Curso');
const CursoCtrl = {};

CursoCtrl.getCursosCol = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
    }

    const curso = await Curso.find({$and:[{ colCod: GetParam.colCod }]})
    .populate('cieCod');
    
    console.log(GetParam);
    res.json(curso); 
};

CursoCtrl.getCurso = async (req, res) => {
    const GetParam = {
        colCod: req.body.colCod,
        curCod: req.body.curCod,
        cieCod: req.body.cieCod
    }
    console.log(GetParam);

    if(GetParam.curCod!=undefined  && GetParam.cieCod==undefined){
        const curso = await Curso.find({$and:[{ colCod: GetParam.colCod,_id:GetParam.curCod }]})
        .populate('cieCod');
        res.json(curso); 
    }
    else if(GetParam.curCod==undefined && GetParam.cieCod!=undefined){
        console.log("Entro");
        const curso = await Curso.find({$and:[{ colCod: GetParam.colCod,cieCod:GetParam.cieCod }]})
        .populate('cieCod');
        res.json(curso); 
    }
    else if(GetParam.curCod!=undefined && GetParam.cieCod!=undefined){
        const curso = await Curso.find({$and:[{ colCod: GetParam.colCod,cieCod:GetParam.cieCod,_id:GetParam.curCod }]})
        .populate('cieCod');
        res.json(curso); 
    }
    else if(GetParam.curCod==undefined && GetParam.cieCod==undefined){
        const curso = await Curso.find({$and:[{ colCod: GetParam.colCod }]})
        .populate('cieCod');
        res.json(curso);
    }
};

CursoCtrl.createCurso = async (req, res) => {
    const GetParam = {
        cieCod: req.body.cieCod,
        curNom: req.body.curNom,
        curDes: req.body.curDes,
        colCod: req.body.colCod
    }

    const CursoExist = await Curso.findOne({$and:[{ curNom: GetParam.curNom,colCod: GetParam.colCod}]});

    if(CursoExist!=undefined){
        console.log(CursoExist);
        res.json({status:510});
    }
    else{
        const newCurso=new Curso(GetParam);
        await newCurso.save();   // se crea un nuevo registro en el documento  
        res.json({status:200}); 
    }
};

CursoCtrl.editCurso = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        cieCod: req.body.cieCod,
        curNom: req.body.curNom,
        curDes: req.body.curDes,
    }
    await Curso.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status:200}); 
};

CursoCtrl.deleteCurso = async (req,res)=> {

    await Curso.findByIdAndRemove(req.params.id);
    res.json({status:200}); 
};

module.exports = CursoCtrl;