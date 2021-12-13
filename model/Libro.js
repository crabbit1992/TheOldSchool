const mongoose=require('mongoose');
const { Schema } = mongoose;

const LibroSchema= new Schema({
    libTtl:{type: String, required:true},              //titulo
    libInt:{type: String, required:false},              //introducción
    libDed:{type: String, required:false},              //dedicatoria
    libBib:{type: String, required:false},              //bibliografia
    libPre:{type: String, required:false},              //presentacion
    imgCod:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},        //imagen de portada
    areCod:{type: Schema.Types.ObjectId,ref: "NucleoArea", required:true},        //imagen de portada
    curCod:{type: Schema.Types.ObjectId,ref: "NucleoCurso", required:true},        //curso
    graCod:{type: Schema.Types.ObjectId,ref: "Grado", required:true},              //grado 
    nivCod:{type: Schema.Types.ObjectId,ref: "Nivel", required:true},              //nivel
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},            //colegio
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
}, 
{ timestamps: true });

module.exports= mongoose.model('Libro',LibroSchema);