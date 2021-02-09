const mongoose=require('mongoose');
const { Schema } = mongoose;

const NucleoCursoSchema= new Schema({ 
    areCod:{type: Schema.Types.ObjectId,ref: "NucleoArea",require:true},   
    ncoCurNom:{type: String, required:true},
    ncoCurDes:{type: String, required:false},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('NucleoCurso',NucleoCursoSchema);