const mongoose=require('mongoose');
const { Schema } = mongoose;

const EvaluacionAdmSchema= new Schema({
    evaTim:{type:Number, required:false}, //Tiempo 
    evaNroIts:{type:Number, required:false},
    libCod:{type: Schema.Types.ObjectId,ref: "Libro", required:true},  //codigo del libro
    temCod:{type: Schema.Types.ObjectId,ref: "Tema", required:true},  //codigo del libro
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},//colegio
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},
    timestamp:{type: Date, default:Date.now},
}, { timestamps: true });

module.exports= mongoose.model('EvaluacionAdm',EvaluacionAdmSchema);