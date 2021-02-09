const mongoose=require('mongoose');
const { Schema } = mongoose;

const NucleoImgSchema= new Schema({
    ncoImgTtl:{type: String, required:true},    // Titulo de la img
    ncoImgDes:{type: String, required:true},    // Descripcion de la img
    ncoImgRta:{type: String, required:true},    // Ruta de la imagen
    ncoImgOrgNom:{type: String, required:true}, // Nombre original de la imagen
    ncoImgTpoAch:{type: String, required:true}, // Tipo de archivo
    ncoImgTmñ:{type: String, required:true},    // Peso de la imagen
   
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('NucleoImg',NucleoImgSchema);