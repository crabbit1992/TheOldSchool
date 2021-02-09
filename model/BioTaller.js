const mongoose=require('mongoose');
const { Schema } = mongoose;

const TallerSchema= new Schema({
    talTpo:{type: String, required:true},
    talTtl:{type: String, required:true},   
    talDes:{type: String, required:true},   
    imgCod:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false}, 
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, //def est activo
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Taller',TallerSchema);