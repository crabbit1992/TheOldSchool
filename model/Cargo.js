const mongoose=require('mongoose');
const { Schema } = mongoose;

const CargoSchema= new Schema({
    carNom:{type:String, required:true},
    carDes:{type:String, required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, //def est activo
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Cargo',CargoSchema);