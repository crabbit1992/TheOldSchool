const mongoose=require('mongoose');
const { Schema } = mongoose;

const AulaVirtualSchema= new Schema({ 
    graCod:{type: Schema.Types.ObjectId,ref: "Grado", required:true},
    secCod:{type: Schema.Types.ObjectId,ref: "Seccion", required:true},
    nivCod:{type: Schema.Types.ObjectId,ref: "Nivel", required:true},
    turCod:{type: Schema.Types.ObjectId,ref: "Turno", required:true},
    prdCod:{type: Schema.Types.ObjectId,ref: "Periodo", required:false}, //analizar continuidad de campo
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    aulNro:{type:String, required:false},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('AulaVirtual',AulaVirtualSchema); 