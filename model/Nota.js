const mongoose=require('mongoose');
const { Schema } = mongoose;

const NotaSchema= new Schema({ 
    aluCod:     {type: Schema.Types.ObjectId,ref: "Alumno", required:true},
    perRepCod:  {type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},
    curCod:     {type: Schema.Types.ObjectId,ref: "NucleoCurso", required:true}, 
    tpoNotCurCod:  {type: Schema.Types.ObjectId,ref: "TipoNotaCurso", required:true},
    notCal:     {type: Number, required:true},    // Calificacion de la nota
    nroClo:     {type: Schema.Types.ObjectId,ref: "DetallePeriodo", required:true}, // A que bimestre, trimestre o ciclo corresponde la nota             
    prdCod:     {type: Schema.Types.ObjectId,ref: "Periodo", required:true},
    alvCod:     {type: Schema.Types.ObjectId,ref: "AulaVirtual", required:true},
    colCod:     {type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:     {type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Nota',NotaSchema);