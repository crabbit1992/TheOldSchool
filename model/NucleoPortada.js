const mongoose=require('mongoose');
const { Schema } = mongoose;

const NucleoPortadaSchema= new Schema({
    imgCod:{type: Schema.Types.ObjectId,ref: "NucleoImg", required: true}, 
    //paiCod:{type: Schema.Types.ObjectId,ref: "Pais", required:false}, 
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, //def est activo
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('NucleoPortada',NucleoPortadaSchema);