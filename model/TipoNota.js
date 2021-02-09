const mongoose=require('mongoose');
const { Schema } = mongoose;

const TipoNotaSchema= new Schema({ 
    tpoNtaNom:  {type: String, required:true},   //Porcentaje de nota 
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('TipoNota',TipoNotaSchema); 