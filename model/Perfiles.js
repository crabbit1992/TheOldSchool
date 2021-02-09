const mongoose=require('mongoose');
const { Schema } = mongoose;

const PerfilesSchema= new Schema({
    perRepCod:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true}, //id del documento PersonaRepositorio
    codMiem:{type: String, required:true},
    carCod:{type: Schema.Types.ObjectId,ref: "Cargo", required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Perfiles',PerfilesSchema);