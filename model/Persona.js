const mongoose=require('mongoose');
const { Schema } = mongoose;

const PersonaSchema= new Schema({
    perRep_Id:{type:String, required:true},
    perNom:{type:String, required:true},
    perApe:{type:String, required:true},
    perDni:{type:String, required:true},
    perCorreo:{type:String, required:true}, 
    perPas:{type:String, required:true},
    perFchNac:{type:Date, required:true},
    perDir:{type:String, required:false},
    perSex:{type:String, required:true}, 
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Persona',PersonaSchema);