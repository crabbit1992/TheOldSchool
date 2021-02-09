const mongoose=require('mongoose');
const { Schema } = mongoose;

const CienciaSchema= new Schema({
    cieNom:{type:String, required:true},
    cieDes:{type:String, required:false},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Ciencia',CienciaSchema);