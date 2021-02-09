const mongoose=require('mongoose');
const { Schema } = mongoose;

const SeccionSchema= new Schema({ 
    secNom:{type: String, required:true},
    secDes:{type: String, required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Seccion',SeccionSchema);