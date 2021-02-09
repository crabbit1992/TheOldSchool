const mongoose=require('mongoose');
const { Schema } = mongoose;

const CursoGradoSchema= new Schema({  
    graCod:{type: Schema.Types.ObjectId,ref: "Grado",required:true},
    nivCod:{type: Schema.Types.ObjectId,ref: "Nivel",required:true},
    areCod:{type: Schema.Types.ObjectId,ref: "NucleoArea",require:true},
    curCod:{type: Schema.Types.ObjectId,ref: "NucleoCurso",require:true},  
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
}); 

module.exports= mongoose.model('CursoGrado',CursoGradoSchema);