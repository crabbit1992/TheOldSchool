const Nota = require('../model/Nota');
const TipoNotaCurso = require('../model/TipoNotaCurso');
const AulaVirtual = require('../model/AulaVirtual');
const Matricula = require('../model/Matricula');
const NucleoCurso = require('../model/NucleoCurso');
const Promedio = require('../model/Promedio');
const PromedioArea = require('../model/PromedioArea');
const EvaluacionTema = require('../model/EvaluacionTema');
const { updateMany } = require('../model/AulaVirtual');
const NotaCtrl = {};

NotaCtrl.getDetNotasSegunTipo = async (req, res) => {
    console.log("Entro getDetNotasSegunTipo");

    const GP={
        perRepCod: req.params.perRepCod,
        alvCod: "",
        nroClo: req.params.nroClo,
        curCod: req.params.curCod,
    }

    const nota = await Nota.find({$and:[{
        perRepCod: GP.perRepCod,
        nroClo: GP.nroClo,
        curCod: GP.curCod
    }]})
    .populate("tpoNotCurCod")
    .populate("perRepCod")
    .populate("curCod");

    console.log(nota);

    if(nota.length==0){
        resJsonProm=[]
        res.json(resJsonProm); 
    }
    else{
        const prdnota=nota[0].prdCod
    const matricula = await Matricula.find({perRepCod: GP.perRepCod, prdCod: prdnota});
    const posicion=matricula.length-1;
    const um=matricula[posicion]; //Ultima matricula

    const aulaVirtual=await AulaVirtual.findOne(
        {
            graCod: um.graCod,
            secCod: um .secCod,
            nivCod: um.nivCod,
            turCod: um.turCod,
            colCod: um.colCod
        })

    GP.alvCod=aulaVirtual._id;

    const tipoNotaCurso = await TipoNotaCurso.find({$and:[{ 
        aulVirCod: GP.alvCod,
        curCod: GP.curCod,
        prdCod: nota[0].prdCod
    }]})
    .populate("tpoNtaCod")

    console.log(tipoNotaCurso);

  
    arregloProm={};
    resJsonProm=[];
    
    var pctEquivalente=0;
    var promTpoNta  =0;
    var promFinal   =0;
    var sumNotas    =0;
    var contador    =0;

    for(var i=0;i<tipoNotaCurso.length;i++){
        arregloProm={};
        pctEquivalente=0;
        sumNotas=0;
        contador=0;
        promTpoNta=0;
        tpoNta  ="";
        
        for(let a=0;a<nota.length;a++){
            
            if(tipoNotaCurso[i].tpoNtaCod._id.toString()==nota[a].tpoNotCurCod.tpoNtaCod._id.toString()){
                
                contador=contador+1;
                sumNotas=sumNotas+nota[a].notCal;
                tpoNta=tipoNotaCurso[i].tpoNtaCod;
                pctEquivalente=nota[a].pctNot;
            }   
        }
        if(contador==0){

        }
        else{

            promTpoNta=Math.round(parseFloat(sumNotas)/contador);
            promFinal=Math.round(parseFloat(promFinal)+(parseFloat(promTpoNta)*(parseFloat(pctEquivalente/100))));


            arregloProm={
                perRepCod:   nota[0].perRepCod,
                curCod:      nota[0].curCod,
                tpoNotCurCod:tipoNotaCurso[i]._id,
                tpoNta:      tpoNta,
                cantNota:    contador,
                prmCur:      promTpoNta,
                ptsEql:      Math.round((parseFloat(promTpoNta)*(parseFloat(pctEquivalente/100))))
            };
        } 
        
        if(arregloProm.prmCur==undefined){

        }else{
            resJsonProm.push(arregloProm);
        }  
    }
    res.json(resJsonProm); 
    }
    
};

NotaCtrl.getHstSgnTpoNta= async(req,res) =>{

    console.log("entro hst");
    const GP={
        perRepCod:req.params.perRepCod,
        tpoNotCurCod: req.params.tpoNotCurCod.toString(),
        nroClo: req.params.nroClo
    }

    const nota = await Nota.find({$and:[{
        perRepCod: GP.perRepCod,
        tpoNotCurCod: GP.tpoNotCurCod,
        nroClo: GP.nroClo
    }]})
    .populate("tpoNotCurCod")


    const tipoNotaCurso = await TipoNotaCurso.findById(GP.tpoNotCurCod)
    .populate("tpoNtaCod")

    arregloNota={}
    resJsonNota=[];

    for(let i=0;i<nota.length;i++){

        arregloNota={
            tpoNotCurCod:nota[i].tpoNotCurCod._id,
            tpoNtaCod:  tipoNotaCurso.tpoNtaCod,
            notCal:     nota[i].notCal,
            fecha:      nota[i].timestamp,
            _id:        nota[i]._id
        }

        console.log(arregloNota.fecha)

        var fecha = new Date(arregloNota.fecha);
        var dia = fecha.getDate();
        var mes = fecha.getMonth()+1;
        var anio = fecha.getFullYear();

        if(dia<10){
            dia="0"+dia;
        }
        if(mes<10){
            mes="0"+mes;
        }

        if (mes == "01") { mes = "Ene"; }
        else if (mes == "02") { mes = "Feb"; }
        else if (mes == "03") { mes = "Mar"; }
        else if (mes == "04") { mes = "Abr"; }
        else if (mes == "05") { mes = "May"; }
        else if (mes == "06") { mes = "Jun"; }
        else if (mes == "07") { mes = "Jul"; }
        else if (mes == "08") { mes = "Ago"; }
        else if (mes == "09") { mes = "Set"; }
        else if (mes == "10") { mes = "Oct"; }
        else if (mes == "11") { mes = "Nov"; }
        else if (mes == "12") { mes = "Dic"; }

        console.log(mes);

        var resFch= dia+" - "+mes+" - "+anio;
        arregloNota.fecha = resFch

        resJsonNota.push(arregloNota);
    }

    
    
    res.json(resJsonNota); 
};

NotaCtrl.createNota = async (req, res) => {
    const GetParam = {
        aluCod:     req.body.aluCod,
        perRepCod:  req.body.perRepCod,
        areCod:     req.body.areCod,
        curCod:     req.body.curCod,  
        tpoNotCurCod:  req.body.tpoNotCurCod,
        notCal:     req.body.notCal,
        nroClo:     req.body.nroClo,
        prdCod:     req.body.prdCod,
        alvCod:     req.body.alvCod,
        colCod:     req.body.colCod
    }

    const newNota=new Nota(GetParam);
    await newNota.save();   // se crea un nuevo registro en el documento Nota

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

    /****************** Calcular su promedio y actualizarlo en el documento Promedio *************** */

    const nota = await Nota.find({$and:[{ //Buscar las notas del alumno que tiene en el curso en este periodo
        colCod: GetParam.colCod,
        perRepCod: GetParam.perRepCod,
        curCod: GetParam.curCod,
        nroClo: GetParam.nroClo,
        prdCod: GetParam.prdCod
    }]})
    .populate("perRepCod")
    .populate("curCod")
    .populate("tpoNotCurCod")

    const tipoNotaCurso = await TipoNotaCurso.find({$and:[{ //Buscar los tipos de notas que tiene el curso en el aula
        aulVirCod: GetParam.alvCod,
        curCod: GetParam.curCod,
        colCod: GetParam.colCod
    }]})
    .populate("tpoNotCod");

    var arregloProm={};
    var CountTiposNota=[];
    
    var promTpoNta  =0;
    var promFinal   =0;
    var sumNotas    =0;
    var contador    =0;
    var sumTpoNta   =0;

    /**  --------   INICIO --------   */
    for(var i=0;i<tipoNotaCurso.length;i++){ // Recorre todo el array de tipos de notas del curso en el aula
        sumNotas=0;
        contador=0;
        promTpoNta=0;
        tpoNta  ="";

        for(let a=0;a<nota.length;a++){ // Recorre las notas del alumno que tiene en el curso

            /**  Compara si el tipo de nota[i] es igual a la nota[a] */
            if(tipoNotaCurso[i].tpoNtaCod.toString()==nota[a].tpoNotCurCod.tpoNtaCod.toString()){
                contador=contador+1;
                sumNotas=sumNotas+nota[a].notCal;
                tpoNta=tipoNotaCurso[i].tpoNtaCod;
                CountTiposNota.push(tipoNotaCurso[i]); 
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
    console.log(sumTpoNta);

    if(sumTpoNta==0){

    }
    else{
        promFinal= Math.round(parseFloat(promFinal/sumTpoNta));
    }
    
    console.log(promFinal);

        arregloProm={
            aluCod:      GetParam.aluCod,
            perRepCod:   GetParam.perRepCod,
            areCod:      GetParam.areCod,
            curCod:      GetParam.curCod,
            nroClo:      GetParam.nroClo,
            prdCod:      GetParam.prdCod,
            alvCod:      GetParam.alvCod,
            colCod:      GetParam.colCod,
            promedio:    parseFloat(promFinal)
        };

        const promedio= await Promedio.findOne({$and:[{ 
            aluCod: arregloProm.aluCod,
            curCod: arregloProm.curCod,
            nroClo: arregloProm.nroClo
        }]});

        console.log(promedio);

        if(promedio!=undefined){
            console.log("entro a actualizar un promedio")
            const id=promedio._id;
            await Promedio.findByIdAndUpdate(id,{$set:arregloProm});
            await AgregarActualizarPromArea(arregloProm)
  
            
            
            res.json({status:200});
        }
        else{
            // agregar promedio
            console.log("entro a registrar un promedio")
            const newPromedio=new Promedio(arregloProm);
            await newPromedio.save();   // se crea un nuevo registro en el documento  
            await AgregarActualizarPromArea(arregloProm)
            res.json({status:200});
        } 




};

AgregarActualizarPromArea=async( objeto )=> {
  
    console.log(objeto);

    const nucleoCurso=  await NucleoCurso.findOne({_id:objeto.curCod});
    var existPromArea= await PromedioArea.findOne({areCod: objeto.areCod, aluCod:objeto.aluCod, nroClo:objeto.nroClo});

    console.log(existPromArea);

    
    if(existPromArea){
        console.log("Si existe un registro con esa area");
        const arrayPromediosArea=  await Promedio.find({areCod:objeto.areCod, nroClo: objeto.nroClo,perRepCod: objeto.perRepCod});

        console.log(arrayPromediosArea);

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

        console.log(GP_promAr);
        const promedioArea= new PromedioArea(GP_promAr)
        const res=await promedioArea.save();
        console.log(res);
    }
    

}



NotaCtrl.editNota = async (req,res)=> {
    const {id}=req.params;
    const GetParam={
        nivDes: req.body.nivDes,
    }
    await Nota.findByIdAndUpdate(id,{$set:GetParam});
    res.json({status:200});
};

NotaCtrl.deleteNota = async (req,res)=> {

    const _id= req.params.id;

    const notaRes=await Nota.findOne({_id:_id});
    const area= await Promedio.findOne({ curCod: notaRes.curCod})
    console.log(area.areCod);
    const GetParam = {
        aluCod:     notaRes.aluCod,
        perRepCod:  notaRes.perRepCod,
        areCod:     area.areCod,
        curCod:     notaRes.curCod,  
        tpoNotCurCod:  notaRes.tpoNotCurCod,
        notCal:     notaRes.notCal,
        nroClo:     notaRes.nroClo,
        prdCod:     notaRes.prdCod,
        alvCod:     notaRes.alvCod,
        colCod:     notaRes.colCod
    }

    console.log(GetParam);

    await Nota.findOneAndRemove({_id:_id});

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

    /****************** Calcular su promedio y actualizarlo en el documento Promedio *************** */

    const nota = await Nota.find({$and:[{ //Buscar las notas del alumno que tiene en el curso en este periodo
        colCod: GetParam.colCod,
        perRepCod: GetParam.perRepCod,
        curCod: GetParam.curCod,
        nroClo: GetParam.nroClo,
        prdCod: GetParam.prdCod
    }]})
    .populate("perRepCod")
    .populate("curCod")
    .populate("tpoNotCurCod")

    const tipoNotaCurso = await TipoNotaCurso.find({$and:[{ //Buscar los tipos de notas que tiene el curso en el aula
        aulVirCod: GetParam.alvCod,
        curCod: GetParam.curCod,
        colCod: GetParam.colCod
    }]})
    .populate("tpoNotCod");

    var arregloProm={};
    var CountTiposNota=[];
    
    var promTpoNta  =0;
    var promFinal   =0;
    var sumNotas    =0;
    var contador    =0;
    var sumTpoNta   =0;

    /**  --------   INICIO --------   */
    for(var i=0;i<tipoNotaCurso.length;i++){ // Recorre todo el array de tipos de notas del curso en el aula
        sumNotas=0;
        contador=0;
        promTpoNta=0;
        tpoNta  ="";

        for(let a=0;a<nota.length;a++){ // Recorre las notas del alumno que tiene en el curso

            /**  Compara si el tipo de nota[i] es igual a la nota[a] */
            if(tipoNotaCurso[i].tpoNtaCod.toString()==nota[a].tpoNotCurCod.tpoNtaCod.toString()){
                contador=contador+1;
                sumNotas=sumNotas+nota[a].notCal;
                tpoNta=tipoNotaCurso[i].tpoNtaCod;
                CountTiposNota.push(tipoNotaCurso[i]); 
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
    console.log(sumTpoNta);

    if(sumTpoNta==0){

    }
    else{
        promFinal= Math.round(parseFloat(promFinal/sumTpoNta));
    }
    
    console.log(promFinal);

        arregloProm={
            aluCod:      GetParam.aluCod,
            perRepCod:   GetParam.perRepCod,
            areCod:      GetParam.areCod,
            curCod:      GetParam.curCod,
            nroClo:      GetParam.nroClo,
            prdCod:      GetParam.prdCod,
            alvCod:      GetParam.alvCod,
            colCod:      GetParam.colCod,
            promedio:    parseFloat(promFinal)
        };

        const promedio= await Promedio.findOne({$and:[{ 
            aluCod: arregloProm.aluCod,
            curCod: arregloProm.curCod,
            nroClo: arregloProm.nroClo
        }]});

        console.log(promedio);

        if(promedio!=undefined){
            console.log("entro a actualizar un promedio")
            const id=promedio._id;
            await Promedio.findByIdAndUpdate(id,{$set:arregloProm});
            await AgregarActualizarPromArea(arregloProm)
  
            
            
            res.json({status:200});
        }
        else{
            // agregar promedio
            console.log("entro a registrar un promedio")
            const newPromedio=new Promedio(arregloProm);
            await newPromedio.save();   // se crea un nuevo registro en el documento  
            await AgregarActualizarPromArea(arregloProm)
            res.json({status:200});
        } 
};

module.exports = NotaCtrl;