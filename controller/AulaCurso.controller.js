const AulaCurso = require('../model/AulaCurso');
const AulaVirtual = require('../model/AulaVirtual');
const Matricula = require('../model/Matricula');
const Periodo = require('../model/Periodo');
const AulaCursoCTRL = {};

AulaCursoCTRL.getMisCursos = async (req, res) => {  // Lista todos los cursos que se se dictan en el aula
    console.log("mis cursos444");
    const GetParam = {
        perRepCod:   req.params.perRepCod
    }
    console.log(GetParam);

    const matricula = await Matricula.find({perRepCod: GetParam.perRepCod})
    .populate("prdCod");
    const posicion=matricula.length-1;
    const um=matricula[posicion]; //Ultima matricula
    const periodo=um.prdCod;

    //Conseguir el año actual 
    let fechaActual = new Date();
    var anioActual  =fechaActual.getFullYear();

    var aulaCurso=[];


    if(anioActual.toString()!=periodo.prdAnio.toString()){
        console.log("Los años no coinciden, no hay resultados");
        res.json(aulaCurso);
    }
    else{
        console.log("Los años coinciden, realziar busqueda");
        const aulaVirtual= await AulaVirtual.findOne({graCod: um.graCod, secCod: um.secCod, nivCod: um.nivCod, turCod: um.turCod, colCod:um.colCod});
        console.log(aulaVirtual);
        
        aulaCurso= await AulaCurso.find({aulVirCod: aulaVirtual._id, prdCod:periodo._id})
        .populate("curCod").populate("areCod")
        .sort (  { "areCod" :  -1, "curCod" :  1  }  );
    
        res.json(aulaCurso);
    }
};

AulaCursoCTRL.getCursosAula = async (req, res) => {  // Lista todos los cursos que se se dictan en el aula
    const GetParam = {
        aulVirCod:   req.params.aulVirCod,
        prdCod:      req.params.prdCod,
    }
    const aulaCurso = await AulaCurso.find({aulVirCod: GetParam.aulVirCod, prdCod: GetParam.prdCod})
    .populate('curCod');

    console.log("Cursos por aulaa");

    console.log(GetParam);
    res.json(aulaCurso);
};

AulaCursoCTRL.getAulasDocente = async (req, res) => {  // Lista todas los aulas donde dicta un docente
    const GetParam = {
        colCod: req.params.colCod,
        prfCod: req.params.prfCod,
        colCod:     req.params.colCod,
    }

    console.log(GetParam);
    console.log("getAulasDocente");

    let fechaActual = new Date();
    var anioActual  =fechaActual.getFullYear();
    var mesActual   =fechaActual.getMonth()+1;
    var diaActual   =fechaActual.getDate();

    console.log(fechaActual);

    if(mesActual<10){
        mesActual="0"+mesActual
    }

    fch=anioActual+"-"+mesActual +"-"+diaActual;
    const parseFchIni=Date.parse(fch);
    var fechaDelDia=new Date(parseFchIni);
    console.log(fechaDelDia);
    
    const periodo= await Periodo.find({colCod: GetParam.colCod})
    .populate("colCod")  // se lista todos los periodos del colegio
    const ultPrdCol= periodo[periodo.length-1];

    
    var objAulas=[];

    const aulaCurso = await AulaCurso.find({colCod: GetParam.colCod, prfCod: GetParam.prfCod})
    .populate("aulVirCod").populate("perRepCod").populate("colCod");
    
    for(i=0;i<aulaCurso.length;i++){
        
        const aulaVirtual=await AulaVirtual.findById({_id:aulaCurso[i].aulVirCod._id})
        .populate("aulVirCod")
        .populate("graCod")
        .populate("secCod")
        .populate("nivCod")
        .populate("turCod");

        objAulas.push(aulaVirtual)
    }
    res.json(objAulas);

};

AulaCursoCTRL.getCursosAulaDocente = async (req, res) => { // Lista todos los cursos que dicta el docente en el aula
    console.log("entroaaaaazzzzzzzzzzz");


    
    const GetParam = {
        aulVirCod:  req.params.aulVirCod,
        prfCod:     req.params.prfCod,
        colCod:     req.params.colCod,
    }
    
    const aulaCurso = await AulaCurso.find({prfCod: GetParam.prfCod, aulVirCod: GetParam.aulVirCod})
    .populate("curCod");
    console.log("aula virtual : " + GetParam.aulVirCod);

    res.json(aulaCurso);
};

AulaCursoCTRL.getDocentesPorAula = async (req, res) => { // Lista todos los docentes que dictan en el aula
    const GetParam = {
        aulVirCod:   req.params.aulVirCod,
        prdCod:      req.params.prdCod,
    }

    console.log(GetParam);

    //Me quede en verificar por que no muestra los docentes que dictan en el aula
   
    const aulaCurso = await AulaCurso.find({aulVirCod: GetParam.aulVirCod})
    .populate('perRepCod')
    .populate('curCod')

    console.log(aulaCurso);
    res.json(aulaCurso);
};

AulaCursoCTRL.getDocenteCurso = async (req, res) => { // Registro del profesor asociado del curso 
    const GetParam = {
        aulVirCod:   req.params.aulVirCod,
        curCod:      req.params.curCod,
    }


   


    
    const aulaCurso = await AulaCurso.findOne({$and:[{aulVirCod: GetParam.aulVirCod, curCod: GetParam.curCod}]})
    .populate('perRepCod')
    .populate('curCod')
    res.json(aulaCurso);
};

AulaCursoCTRL.createAulaCurso = async (req, res) => {
    const GetParam = {
        aulVirCod:   req.body.aulVirCod,
        areCod:      req.body.areCod,
        curCod:      req.body.curCod,
        prfCod:      req.body.prfCod,
        perRepCod:   req.body.perRepCod,
        colCod:      req.body.colCod,
        prdCod:      req.body.prdCod,
    }
    console.log(GetParam);

    const aulaCursoExist = await AulaCurso.findOne({$and:[{
                aulVirCod:  GetParam.aulVirCod,
                curCod:     GetParam.curCod,
                prfCod:     GetParam.prfCod,
                colCod:     GetParam.colCod,
                prdCod:     GetParam.prdCod,
             }]});

    if(aulaCursoExist!=undefined){
        console.log(aulaCursoExist);
        res.json({status: 510 });
    }
    else{
        const newAulaCurso=new AulaCurso(GetParam);
        await newAulaCurso.save();   // se crea un nuevo registro en el documento  
        res.json({status: 200 });
    }
};

AulaCursoCTRL.editDocenteCurso = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        prfCod: req.body.prfCod,
        perRepCod: req.body.perRepCod,
    }

    await AulaCurso.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status: 200 });
};

AulaCursoCTRL.deleteAulaCurso = async (req,res)=> {

    await AulaCurso.findByIdAndReremove(req.params.id);
    res.json({status: 200 });
};


module.exports = AulaCursoCTRL;