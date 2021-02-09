const mongoose=require('mongoose');
const { Schema } = mongoose;

const EstadoSchema= new Schema({
    estCod:{type:String, required:true},
    estNom:{type:String, required:true},
    estDes:{type:String, required:true},
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Estado',EstadoSchema);