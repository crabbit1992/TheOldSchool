const mongoose=require('mongoose');
const { Schema } = mongoose;

const TemaSchema= new Schema({
    libCod:{type: Schema.Types.ObjectId,ref: "Libro", required:true},  //codigo del libro
    nroOrd:{type: Number, required:true},
    temTtl:{type: String, required:true},                //titulo
    temDes:{type: String, required:true},                //descripcion
    temEvaTim:{type:Number, required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},            //colegio
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
}, 
{ timestamps: true });

module.exports= mongoose.model('Tema',TemaSchema);