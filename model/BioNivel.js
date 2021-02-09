const mongoose=require('mongoose');
const { Schema } = mongoose;

const BioNivelSchema= new Schema({
    nivTpo:{type:String, required:true},
    nivTtl:{type:String, required:true},   
    nivDes:{type:String, required:true},   
    imgCod:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false}, 
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, //def est activo
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('BioNivel',BioNivelSchema);