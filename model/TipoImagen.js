const mongoose=require('mongoose');
const { Schema } = mongoose;

const TipoImagenSchema= new Schema({
    tpoImgNom   :{type:String,required:true},
    tpoImgDes   :{type: String,required:false},   
    timestamp   :{type: Date, default:Date.now},
});

module.exports= mongoose.model('TipoImagen',TipoImagenSchema);