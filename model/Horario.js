const mongoose=require('mongoose');
const { Schema } = mongoose;

const HorarioSchema= new Schema({ 
    curCod:{type: Schema.Types.ObjectId,ref: "NucleoCurso", required:true},
    hroDia:{type: String, required:true},
    itvHroCod:{type: Schema.Types.ObjectId,ref: "IntervaloHorario", required:true},
    alvCod:{type: Schema.Types.ObjectId,ref: "AulaVirtual", required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Horario',HorarioSchema);