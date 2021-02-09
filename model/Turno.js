const mongoose=require('mongoose');
const { Schema } = mongoose;

const TurnoSchema= new Schema({ 
    turNom:{type: String, required:true},
    turDes:{type: String, required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Turno',TurnoSchema);