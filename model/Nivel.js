const mongoose=require('mongoose');
const { Schema } = mongoose;

const NivelSchema= new Schema({ 
    nivNum:{type: Number, required:true},
    nivDes:{type: String, required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Nivel',NivelSchema);