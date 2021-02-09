const mongoose=require('mongoose');
const { Schema } = mongoose;

const CurriculaSchema= new Schema({ 
    prd:{type: Number, required:true}, //Periodo
    areCod:{type: Schema.Types.ObjectId,ref: "NucleoArea",require:true},
    curCod:{type: Schema.Types.ObjectId,ref: "NucleoCurso",require:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Curricula',CurriculaSchema);