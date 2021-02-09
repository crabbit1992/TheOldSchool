const Matricula = require('../model/Matricula');
const AulaVirtual = require('../model/AulaVirtual');
const AulaCurso = require('../model/AulaCurso');
const CursoGrado = require('../model/CursoGrado');
const Nota = require('../model/Nota');
const Promedio = require('../model/Promedio');
const PromedioArea = require('../model/PromedioArea');
const TipoNotaCurso = require('../model/TipoNotaCurso');
const Periodo = require('../model/Periodo');
const DetallePeriodo = require('../model/DetallePeriodo');
const Perfiles= require('../model/Perfiles');
const TipoPeriodo = require('../model/TipoPeriodo');
const MatriculaCtrl = {};

MatriculaCtrl.getMatriculasCol = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
        prdCod: req.params.prdCod,
    }

    console.log(GetParam);

    const matricula = await Matricula.find({$and:[{ colCod: GetParam.colCod}]})
    .populate('aluCod')
    .populate('perRepCod')
    .populate('graCod')
    .populate('secCod')
    .populate('nivCod')
    .populate('turCod')
    .populate('colCod')
    .populate('prdCod')
    .sort (  { "nivCod" :  -1, "graCod" :  1  }  );

    console.log(matricula);

    res.json(matricula); 
};

MatriculaCtrl.getMatriculasColAlum = async (req, res) => {
    const GetParam = {
        colCod: req.params.colCod,
        aluCod: req.params.aluCod,
    }


   const matricula = await Matricula.find({$and:[{
            colCod: GetParam.colCod,
            aluCod: GetParam.aluCod,
        }]})
        .populate('aluCod')
        .populate('perRepCod')
        .populate('graCod')
        .populate('secCod')
        .populate('nivCod')
        .populate('turCod')
        .populate('colCod')
        .populate('prdCod');
 

   
   res.json(matricula); 
};

MatriculaCtrl.getMatriculasAlum = async (req, res) => {
    const GetParam = {
        perRepCod: req.params.perRepCod,
    }

   const matricula = await Matricula.find({$and:[{
            perRepCod: GetParam.perRepCod
        }]})
        .populate('graCod')
        .populate('nivCod')
        .populate('secCod')
        .populate('turCod')
        .sort (  { "timestamp" :  1 }  );
 
    console.log(matricula);

   res.json(matricula); 
};


MatriculaCtrl.getMatriculas= async (req,res) =>{
    const GP={
        graCod: req.body.graCod,
        secCod: req.body.secCod,
        nivCod: req.body.nivCod,
        prdCod: req.body.prdCod,
        colCod: req.body.colCod
    }

    
    if(GP.graCod==undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.prdCod==undefined){
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod 
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de gradCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod ,
            graCod: GP.graCod,       
            }]})
        .populate('aluCod')
        .populate('perRepCod')
        .populate('graCod')
        .populate('secCod')
        .populate('nivCod')
        .populate('turCod')
        .populate('colCod')
        .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de gradCod y secCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod ,
            graCod: GP.graCod, 
            secCod: GP.secCod      
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de gradCod, secCod y nivCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            secCod: GP.secCod,
            nivCod: GP.nivCod,
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 

    }
    else if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de gradCod, secCod, nivCod y prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod, 
            secCod: GP.secCod,
            nivCod: GP.nivCod      
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }

/***********************************************************************************************************/

    else if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de secCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod ,
            secCod: GP.secCod      
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de secCod y nivCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod,
            nivCod: GP.nivCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod!=undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de secCod, nivCod y prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod,
            nivCod: GP.nivCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }

/***********************************************************************************************************/    

    else if( GP.graCod==undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de nivCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            nivCod: GP.nivCod,
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }

    else if( GP.graCod==undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de nivCod y prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            nivCod: GP.nivCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }

/***********************************************************************************************************/ 

    else if( GP.graCod==undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }

/***********************************************************************************************************/

    else if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod==undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de graCod y prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.prdCod==undefined ){
        // buscar solo con el parametro de graCod y nivCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            nivCod: GP.nivCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }
    else if( GP.graCod==undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de secCod y prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            secCod: GP.secCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
        
    }
    else if( GP.graCod!=undefined && GP.secCod==undefined && GP.nivCod!=undefined && GP.prdCod!=undefined ){
        // buscar solo con el parametro de grado nivCod y prdCod
        const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            nivCod: GP.nivCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
        
    }
    else if( GP.graCod!=undefined && GP.secCod!=undefined && GP.nivCod==undefined && GP.prdCod!=undefined ){
         // buscar solo con el parametro de grado, secCod y prdCod
         const matricula = await Matricula.find({$and:[
            { 
            colCod: GP.colCod,
            graCod: GP.graCod,
            secCod: GP.secCod,
            prdCod: GP.prdCod
            }]})
            .populate('aluCod')
            .populate('perRepCod')
            .populate('graCod')
            .populate('secCod')
            .populate('nivCod')
            .populate('turCod')
            .populate('colCod')
            .populate('prdCod');

        
        console.log(matricula);
        res.json(matricula); 
    }

    console.log(GP);
}


MatriculaCtrl.getAlumnosPorAula = async (req, res) => {   
    const GetParam = {
        colCod: req.params.colCod,
        graCod: req.params.graCod,
        nivCod: req.params.nivCod,
        secCod: req.params.secCod,
        turCod: req.params.turCod,
    }
    console.log(GetParam);

    const periodo= await Periodo.find({colCod: GetParam.colCod})
    .populate("colCod")  // se lista todos los periodos del colegio
    const ultPrdCol= periodo[periodo.length-1];

    var estCod='5e0a8a3b9644411040ebf292';
    await Matricula.find({$and:[{ 
        colCod: GetParam.colCod,
        graCod: GetParam.graCod,
        nivCod: GetParam.nivCod,
        secCod: GetParam.secCod,
        turCod: GetParam.turCod,
        estCod: estCod,
        prdCod: ultPrdCol._id
    }]},(err,matricula)=>{
        console.log("Tamaño de la respuesta : " + matricula.length);
        console.log(matricula);
        res.json(matricula); 
    })
    .populate('aluCod')
    .populate('perRepCod');
};


MatriculaCtrl.createMatricula = async (req, res) => {
    const GP = {
        aluCod: req.body.aluCod, // evaluar continuidad del campo
        perRepCod: req.body.perRepCod,
        graCod: req.body.graCod,
        secCod: req.body.secCod,
        nivCod: req.body.nivCod,
        turCod: req.body.turCod,
        colCod: req.body.colCod,
        prdCod: req.body.prdCod,
    }

    console.log(GP);

    let fechaActual = new Date();
    var anioActual  = fechaActual.getFullYear();
    var mesActual   = fechaActual.getMonth()+1;
    var diaActual   = fechaActual.getDate();

    console.log(fechaActual);

    if(mesActual<10){
        mesActual="0"+mesActual
    }
    if(diaActual<10){
        diaActual="0"+diaActual
    }

    fch=anioActual+"-"+mesActual +"-"+diaActual;
    const parseFchIni=Date.parse(fch);
    var fechaDelDia=new Date(parseFchIni);
    console.log(fechaDelDia);

    /** Evaluar si el periodo que se va a matricular ya caduco o no (Pendiente) */
    const evaPrd=await Periodo.findOne({_id: GP.prdCod});

    if(evaPrd.prdFchFin<fechaDelDia){
        console.log("No se puede matricular, debe crear un periodo actual");
        res.json({status:420});
    }
    else if(evaPrd.prdAnio<anioActual){
        console.log("No se puede matricular, el año del periodo es menor al año actual");
        res.json({status:420});
    }
    else{

        const periodo= await Periodo.find({colCod: GP.colCod})  // se lista todos los periodos del colegio
        .populate("tpoPrdCod"); 
        const ultimoPrdCol= periodo.length-1;
        var anioUltPrd=periodo[ultimoPrdCol].prdAnio; // se obtiene el ultimo año periodo

        const MatriculaExist = await Matricula.findOne(
            {$and:[{ 
                aluCod: GP.aluCod,
                colCod: GP.colCod,
                prdCod: GP.prdCod
            }]});

        if(MatriculaExist!=undefined){ // Si se encuentra matriculado en el colegio
            console.log(MatriculaExist);
            console.log("Ya se encuentra matriculado en el colegio");

            res.json({status:510});
        }
        else{  // Si no se encuentra matriculado en el colegio

            console.log("El alumno no se encuentra matriculado en el colegio");
            const promedioArea=await PromedioArea.find({perRepCod: GP.perRepCod})//Consular si el alumno tiene algun promedio
            .populate("prdCod").populate("perRepCod").populate("areCod");
            const promedioLength= promedioArea.length;

            if(promedioLength==0){ //Si el alumno no tiene ningun promedio

                console.log("No existe ningun promedio, se puede matricular sin cambiar nada");
                const newMatricula=new Matricula(GP);
                await newMatricula.save();   // se crea un nuevo registro en el documento  
                res.json({status:200});

            }
            else{
                console.log("el alumno si cuenta con algun promedio");
    
                const ultPromAnioAlu=promedioArea[promedioArea.length-1].prdCod.prdAnio;
                const ultPrdAlu=promedioArea[promedioArea.length-1].prdCod;
                console.log(ultPrdAlu);
           
                console.log("Ultima nota del año del alumno : "+ultPromAnioAlu);
                console.log("Ultimo periodo del colegio : "+anioUltPrd);

                /** Determinar si el colegio es particular o estatal */

                const mAlu= await Matricula.find({perRepCod: GP.perRepCod});

                for(let i=0; i<mAlu.length; i++){

                    if(mAlu[i].nivCod==GP.nivCod && mAlu[i].graCod==GP.graCod){ //Si existe un grado nivel 
                        await Matricula.deleteOne({ _id: mAlu[i]._id}); //Eliminar matricula y notas asociadas a ese periodo
                        await PromedioArea.deleteMany({perRepCod: GP.perRepCod, prdCod: mAlu[i].prdCod});
                        await Promedio.deleteMany({perRepCod: GP.perRepCod, prdCod: mAlu[i].prdCod});
                        await Nota.deleteMany({perRepCod: GP.perRepCod, prdCod: mAlu[i].prdCod});
                    }
                    
                }

                if(ultPromAnioAlu>anioUltPrd){
                    console.log("El alumno viene de un año de periodo superior al del colegio");
                    //No es posible matricular, el colegio debe crear un nuevo periodo actual.
                
                    res.json({status:420});
                }
                else if(ultPromAnioAlu==anioUltPrd){
                    console.log("las notas del alumno coinciden con el año del periodo del colegio");
                    //Se debe eliminar las notas del alumno del periodo actual
                    /** Remover los promediosArea del alumno de este periodo */
                    await PromedioArea.deleteMany({perRepCod: GP.perRepCod, prdCod: ultPrdAlu._id});
                    await Promedio.deleteMany({perRepCod: GP.perRepCod, prdCod: ultPrdAlu._id});
                    await Nota.deleteMany({perRepCod: GP.perRepCod, prdCod: ultPrdAlu._id});

                    const newMatricula=new Matricula(GP);
                    await newMatricula.save();   // se crea un nuevo registro en el documento  
                    res.json({status:200});
                }
                else{
                    console.log("las notas del alumno son de un año menor del año del periodo del colegio");
                    //Se pede matricular en este periodo actual del colegio
                    const newMatricula=new Matricula(GP);
                    await newMatricula.save();   // se crea un nuevo registro en el documento  
                    res.json({status:200});
                }
            }
        }
    }   
};

MatriculaCtrl.editMatricula = async (req,res)=> {
    const {id}=req.params;
    var GetParam={
        aluCod: req.body.aluCod,
        perRepCod: req.body.perRepCod,
        graCod: req.body.graCod,
        secCod: req.body.secCod,
        nivCod: req.body.nivCod,
        turCod: req.body.turCod,
        prdCod: req.body.prdCod,
        colCod: req.body.colCod,  
    }

    const periodo= await Periodo.findById(GetParam.prdCod);

    let fechaActual = new Date();
    let anio=fechaActual.getFullYear()+"";
    let mes=(fechaActual.getUTCMonth()+1)+"";
    let dia=fechaActual.getUTCDate()+"";

    if(mes<10){
        mes='0'+mes;
    }
    if(dia<10){
        dia='0'+dia;
    }

    let fechaModelo=(anio+"-"+mes+"-"+dia);
    let fechaParse=Date.parse(fechaModelo.toString())
    const fechaAct = new Date(fechaParse);
    var cicloAct;
  
    var detallePrd= await DetallePeriodo.find({prdCod: GetParam.prdCod});

    function removeDuplicates(originalArray, prop) {
        var newArray = [];
        var lookupObject  = {};
   
        for(var i in originalArray) {
           lookupObject[originalArray[i][prop]] = originalArray[i];
        }
   
        for(i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
         return newArray;
    }
    
    for(let i=0;i<detallePrd.length;i++){
        if(fechaAct>=detallePrd[i].detPrdIni && fechaAct<=detallePrd[i].detPrdFin){
            cicloAct=detallePrd[i];   
        }
    }

    if(periodo.prdFchFin<fechaAct){
        console.log("No se puede editar, ya termino el periodo"); // enviar respuesta

    }else{

        console.log("Se puede editar, aun  no termina el periodo");

        var aulVirtualExist = await AulaVirtual.findOne({$and:[{ 
                graCod: GetParam.graCod,
                secCod: GetParam.secCod,
                nivCod: GetParam.nivCod,
                turCod: GetParam.turCod,
                colCod: GetParam.colCod 
            }]});
    
        if(aulVirtualExist!=undefined){

            console.log("El aula seleccionada si existe");

            const promedio= await Promedio.find({perRepCod: GetParam.perRepCod, prdCod: GetParam.prdCod})
            .populate("prdCod");
            const promedioLength= promedio.length;
            if(promedioLength==0){

                console.log("No existe ningun promedio, se puede matricular sin cambiar nada");
                await Matricula.findByIdAndUpdate(id,{$set:GetParam});
                res.json({status:200});
            }else{
                
                console.log("Si existe un promedio, por lo tanto se debera cambiar registros");

                var cursoGrado = await CursoGrado.find({$and:[{ //Lista de cursos del aula
                    graCod: aulVirtualExist.graCod,
                    nivCod: aulVirtualExist.nivCod,
                    colCod: GetParam.colCod,
                }]})
                .populate("curCod");

                await Matricula.findByIdAndUpdate(id,{$set:GetParam});
                await Promedio.update(
                    {perRepCod: GetParam.perRepCod, nroClo: cicloAct},
                    {$set: {alvCod: aulVirtualExist._id}},
                    {multi:true}
                )
                await PromedioArea.update(
                    {perRepCod: GetParam.perRepCod, nroClo: cicloAct},
                    {$set: {alvCod: aulVirtualExist._id}},
                    {multi:true}
                )

                for(var j=0;j<cursoGrado.length;j++){ //recorrer la lista de cursos

                    var curCod=cursoGrado[j].curCod._id.toString();
                    console.log(cursoGrado[j].curCod.ncoCurNom + "--------");

                    var tpoNtaCur= await TipoNotaCurso.find({$and:[{ //Buscar el tipo de notas de cada curso
                        aulVirCod: aulVirtualExist._id,
                        prdCod: GetParam.prdCod,
                        curCod: curCod,
                        colCod: GetParam.colCod
                    }]})
                    .populate("tpoNtaCod");

                    console.log("Tipos de notas : " +tpoNtaCur.length);
                    
                
                    if(tpoNtaCur.length==0){
                    }
                    else{

                        var notasArray = await Nota.find({$and:[{ 
                            colCod: GetParam.colCod,
                            perRepCod: GetParam.perRepCod,
                            curCod: curCod,
                            nroClo: cicloAct,
                            prdCod: GetParam.prdCod
                        }]})
                        .populate("perRepCod")
                        .populate("curCod")
                        .populate("tpoNotCurCod")

                        console.log("Cantidad de notas del alumno : "+notasArray.length);
                        

                        for(var u=0;u<tpoNtaCur.length;u++){

                                for(var n=0;n<notasArray.length;n++){

                                if(tpoNtaCur[u].tpoNtaCod._id==notasArray[n].tpoNotCurCod.tpoNtaCod.toString()){
            
                                    let tipoNotCurso=notasArray[n].tpoNotCurCod._id;
                                    await Nota.findOneAndUpdate(
                                        {perRepCod: GetParam.perRepCod, nroClo: cicloAct, curCod: curCod, tpoNotCurCod: tipoNotCurso},
                                        {$set: {alvCod: aulVirtualExist._id, tpoNotCurCod: tpoNtaCur[u]._id}},
                                        (err, notaObj)=>{
                                        }
                                    )
                                }
                            }
                        }
                    }

                    if(j==cursoGrado.length-1){

                        await Matricula.findByIdAndUpdate(id,{$set:GetParam});

                        for(var g = 0; g <cursoGrado.length; g++){

                            var curCod_id=cursoGrado[g].curCod._id.toString();
                            var areCod=cursoGrado[g].areCod;

                            var arregloProm={};
                            var resJsonProm=[];
                            var CountTiposNota=[];
                            
                            var promTpoNta  =0;
                            var promFinal   =0;
                            var sumNotas    =0;
                            var contador    =0;
                            var sumTpoNta   =0;
                            var tpoNta      ="";

                            var nota = await Nota.find({$and:[{ 
                                colCod: GetParam.colCod,
                                perRepCod: GetParam.perRepCod,
                                curCod: curCod_id,
                                nroClo: cicloAct,
                                prdCod: GetParam.prdCod
                            }]})
                            .populate("perRepCod")
                            .populate("curCod")
                            .populate("tpoNotCurCod")
                        
                            var tiposNota = await TipoNotaCurso.find({$and:[{ 
                                aulVirCod: aulVirtualExist._id,
                                prdCod: GetParam.prdCod,
                                curCod: curCod_id,
                                colCod: GetParam.colCod
                            }]})
                            .populate("tpoNotCod");

                            if(tiposNota.length==0){

                            }
                            else{

                                for(var i=0;i<tiposNota.length;i++){
                                    sumNotas=0;
                                    contador=0;
                                    promTpoNta=0;
                                    tpoNta  ="";
                            
                                    for(let a=0;a<nota.length;a++){
                            
                                        if(tiposNota[i].tpoNtaCod.toString()==nota[a].tpoNotCurCod.tpoNtaCod.toString()){
                                            
                                            contador=contador+1;
                                            sumNotas=sumNotas+nota[a].notCal;
                                            tpoNta=tiposNota[i].tpoNtaCod;
                                            CountTiposNota.push(tiposNota[i]); 
                                        }   
                                    }
                                    if(contador==0){
                            
                                    }
                                    else{
                                        promTpoNta=Math.round(parseFloat(sumNotas)/contador);
                                        promFinal=Math.round(parseFloat(promFinal)+(parseFloat(promTpoNta)));
                                    }
                                }
    
                                var uniqueArray = removeDuplicates(CountTiposNota, "_id");
    
                                sumTpoNta=uniqueArray.length;
    
                                if(sumTpoNta==0){
    
                                }
                                else{
                                    promFinal= Math.round(parseFloat(promFinal/sumTpoNta));
                                }
    
                                arregloProm={
                                    aluCod:      GetParam.aluCod,
                                    perRepCod:   GetParam.perRepCod,
                                    areCod:      areCod,
                                    curCod:      curCod_id,
                                    nroClo:      cicloAct,
                                    prdCod:      GetParam.prdCod,
                                    alvCod:      aulVirtualExist._id,
                                    colCod:      GetParam.colCod,
                                    promedio:    parseFloat(promFinal)
                                };
                        
                                var promedioOne= await Promedio.findOne({$and:[{ 
                                    aluCod: arregloProm.aluCod,
                                    curCod: arregloProm.curCod,
                                    nroClo: arregloProm.nroClo
                                }]});
    
                                if(promedioOne!=undefined){
                                    console.log("entro a actualizar un promedio")
                                    const id=promedioOne._id;
                                    await Promedio.findByIdAndUpdate(id,{$set:arregloProm});
                                    await AgregarActualizarPromArea(arregloProm)
                                }
                                else{
                                    // agregar promedio
                                    console.log("entro a registrar un promedio")
                                    const newPromedio=new Promedio(arregloProm);
                                    await newPromedio.save();   // se crea un nuevo registro en el documento  
                                    await AgregarActualizarPromArea(arregloProm)
                                    
                                } 
                            }

                            if(g==cursoGrado.length-1){
                                res.json({status:200});
                            }
                        }
                    }
                }
            } 
        }
        else{
            console.log("No se encontro el aula");
            res.json({status:404});
        }
    }
};

AgregarActualizarPromArea=async( objeto )=> {
  
    const nucleoCurso=  await NucleoCurso.findOne({_id:objeto.curCod});
    var existPromArea= await PromedioArea.findOne({areCod: objeto.areCod, aluCod:objeto.aluCod, nroClo:objeto.nroClo});

    if(existPromArea){
        console.log("Si existe un registro con esa area");
        const arrayPromediosArea=  await Promedio.find({areCod:objeto.areCod, nroClo: objeto.nroClo,perRepCod: objeto.perRepCod});

        var sumaPromedios=0;

        for(let i=0;i<arrayPromediosArea.length;i++){

            sumaPromedios=sumaPromedios+arrayPromediosArea[i].promedio;

        }
        console.log("La suma es : "+ sumaPromedios);
        console.log("se divide entre : "+ arrayPromediosArea.length);

        var promedioArea= Math.round(parseFloat(sumaPromedios/arrayPromediosArea.length));
        console.log("El promedio es : "+promedioArea);

        const GP_promAr={
            aluCod:   objeto.aluCod,
            perRepCod:  objeto.perRepCod,
            areCod:   nucleoCurso.areCod,
            curCod:   objeto.curCod,
            nroClo:   objeto.nroClo,
            prdCod:   objeto.prdCod,
            alvCod:   objeto.alvCod,
            promedio: parseFloat(promedioArea),
            colCod:   objeto.colCod,
        }
        //Actualizar el registro de promedioArea
        await PromedioArea.findByIdAndUpdate(existPromArea._id,{$set:GP_promAr});
    }
    else{
        console.log("No existe un registro con esa area");
        //Crear un nuevo registro
        const GP_promAr={
            aluCod:   objeto.aluCod,
            perRepCod:  objeto.perRepCod,
            areCod:   nucleoCurso.areCod,
            curCod:   objeto.curCod,
            nroClo:   objeto.nroClo,
            prdCod:   objeto.prdCod,
            alvCod:   objeto.alvCod,
            promedio: objeto.promedio,
            colCod:   objeto.colCod,
        }

        const promedioArea= new PromedioArea(GP_promAr)
        await promedioArea.save();
    }
    
    
}

MatriculaCtrl.deleteMatricula = async (req,res)=> {

    await Matricula.findByIdAndRemove(req.params.id);
    res.json({status:200});
};

module.exports = MatriculaCtrl;