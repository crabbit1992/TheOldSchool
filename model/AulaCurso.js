const mongoose=require('mongoose');
const { Schema } = mongoose;

const AulaCursoSchema= new Schema({  
    aulVirCod:  {type: Schema.Types.ObjectId,ref: "AulaVirtual",required:true},
    areCod:     {type: Schema.Types.ObjectId,ref: "NucleoArea",required:true},  
    curCod:     {type: Schema.Types.ObjectId,ref: "NucleoCurso",required:true},  
    prfCod:     {type: Schema.Types.ObjectId,ref: "Profesor",required:false},  
    perRepCod:  {type: Schema.Types.ObjectId,ref: "PersonaRepositorio",required:true},  
    colCod:     {type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    prdCod:     {type: Schema.Types.ObjectId,ref: "Periodo", required:true},
    estCod:     {type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:  {type: Date, default:Date.now},
});

module.exports= mongoose.model('AulaCurso',AulaCursoSchema);