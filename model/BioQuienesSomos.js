const mongoose=require('mongoose');
const { Schema } = mongoose;

const QuienesSomosSchema= new Schema({
    qsTtl:{type:String, required:true},   //"Quienes somos- apartado titulo"
    qsDes:{type:String, required:true},   //"Quienes somos- apartado descripcion"
    imgCod:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},     //"Quienes somos- apartado imagen"
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, //def est activo
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('QuienesSomos',QuienesSomosSchema);