const mongoose=require('mongoose');
const { Schema } = mongoose;

const MatriculaSchema= new Schema({ 
    aluCod:{type: Schema.Types.ObjectId,ref: "Alumno", required:true},
    perRepCod:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},
    graCod:{type: Schema.Types.ObjectId,ref: "Grado", required:true},
    secCod:{type: Schema.Types.ObjectId,ref: "Seccion", required:true},
    nivCod:{type: Schema.Types.ObjectId,ref: "Nivel", required:true},
    turCod:{type: Schema.Types.ObjectId,ref: "Turno", required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    prdCod:{type: Schema.Types.ObjectId,ref: "Periodo", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Matricula',MatriculaSchema);