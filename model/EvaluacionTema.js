const mongoose=require('mongoose');
const { Schema } = mongoose;

const EvaluacionTemaSchema= new Schema({
    libCod:{type: Schema.Types.ObjectId,ref: "Libro", required:true},  //codigo del libro
    temCod:{type: Schema.Types.ObjectId,ref: "Tema", required:true},  //codigo del libro
    perRepCod:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},
    evaTemNroIto:{type: Number, required:false},
    evaTemNta:{type: Number, required:true},
    
    prdCod:{type: Schema.Types.ObjectId,ref: "Periodo", required:true},
    graCod:{type: Schema.Types.ObjectId,ref: "Grado", required:true},
    secCod:{type: Schema.Types.ObjectId,ref: "Seccion", required:true},
    nivCod:{type: Schema.Types.ObjectId,ref: "Nivel", required:true},
    
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},            //colegio
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('EvaluacionTema',EvaluacionTemaSchema);