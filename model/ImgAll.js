const mongoose=require('mongoose');
const { Schema } = mongoose;

const ImgAllSchema= new Schema({
    ImgAllTtl:{type: String, required:false},    // Titulo de la img
    ImgAllDes:{type: String, required:false},    // Descripcion de la img
    ImgAllRta:{type: String, required:true},    // Ruta de la imagen
    ImgAllOrgNom:{type: String, required:true}, // Nombre original de la imagen
    ImgAllTpoAch:{type: String, required:true}, // Tipo de archivo
    ImgAllTmñ:{type: String, required:true},    // Peso de la imagen
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
}
,{ timestamps: true });

module.exports= mongoose.model('ImgAll',ImgAllSchema);