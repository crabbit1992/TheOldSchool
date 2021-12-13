const mongoose=require('mongoose');
const { Schema } = mongoose;

const RecoveryPassSchema= new Schema({ 
    correo:{type: String, required:true},
    codigo:{type: String, required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('RecoveryPass',RecoveryPassSchema);