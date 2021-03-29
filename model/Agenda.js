const mongoose=require('mongoose');
const { Schema } = mongoose;

const AgendaSchema= new Schema({
    ageTtl:{type: String, required:true},
    ageDes:{type: String, required:true},
    ageCre:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true}, //id del documento Repositorio Persona
    ageCur:{type: Schema.Types.ObjectId,ref: "NucleoCurso", required:false},
    alvCod:{type: Schema.Types.ObjectId,ref: "AulaVirtual", required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:  {type: Date, default:Date.now},
}); 

module.exports= mongoose.model('Agenda',AgendaSchema);