const mongoose=require('mongoose');
const { Schema } = mongoose;

const CoordinadorSchema= new Schema({
    perRepCod:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true}, //id del documento Repositorio Persona
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Coordinador',CoordinadorSchema);