const mongoose=require('mongoose');
const { Schema } = mongoose;


const PersonaRepositorioSchema= new Schema({
    perRepDni:{type:String, required:true},
    perRepNom:{type:String, required:true},
    perRepApe:{type:String, required:true},
    perRepFchNac:{type:Date, required:true},
    perRepDir:{type:String, required:false},
    perRepSex:{type:String, required:true}, 
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('PersonaRepositorio',PersonaRepositorioSchema);