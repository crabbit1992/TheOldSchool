const mongoose=require('mongoose');
const { Schema } = mongoose;

const HistorialRegistroSchema= new Schema({
    hrgfch:{type: Date, default:Date.now},
    usuRsp:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},
    tpaCod:{type: Schema.Types.ObjectId,ref: "TipoAccion", required:true},
    carCod:{type: Schema.Types.ObjectId,ref: "Cargo", required:true},
    usuAfc:{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('HistorialRegistro',HistorialRegistroSchema);