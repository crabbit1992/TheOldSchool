const mongoose=require('mongoose');
const { Schema } = mongoose;

const ColegioImgSchema= new Schema({
    colImgTtl:{type: String, required:true},    // Titulo de la img
    colImgDes:{type: String, required:true},    // Descripcion de la img
    colImgRta:{type: String, required:true},    // Ruta de la imagen
    colImgOrgNom:{type: String, required:true}, // Nombre original de la imagen
    colImgTpoAch:{type: String, required:true}, // Tipo de archivo
    colImgTmñ:{type: String, required:true},    // Peso de la imagen
    tpoImgCod:{type: Schema.Types.ObjectId,ref: "TipoImagen",default:"5e61824b41ff1d17acfe60ba", required:false}, // Tipo de imagen

    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('ColegioImg',ColegioImgSchema);