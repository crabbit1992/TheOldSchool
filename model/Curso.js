const mongoose=require('mongoose');
const { Schema } = mongoose;

const CursoSchema= new Schema({
    cieCod:{type: Schema.Types.ObjectId,ref: "Ciencia",required:true}, 
    curNom:{type:String, required:true},
    curDes:{type:String, required:false},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio",required:true}, 
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Curso',CursoSchema);