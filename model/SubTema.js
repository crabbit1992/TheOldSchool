const mongoose=require('mongoose');
const { Schema } = mongoose;

const SubTemaSchema= new Schema({
    libCod:{type: Schema.Types.ObjectId,ref: "Libro", required:true},  //codigo del libro
    temCod:{type: Schema.Types.ObjectId,ref: "Tema", required:true},  //codigo del libro
    nroOrd:{type: Number, required:true},
    subTemTtl:{type: String, required:true},                //titulo
    subTemDes:{type: String, required:true},                //dedicatoria
    imgCod:{type: Schema.Types.ObjectId,ref: "ImgAll", required:true},        //imagen de portada
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('SubTema',SubTemaSchema);