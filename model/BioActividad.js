const mongoose=require('mongoose');
const { Schema } = mongoose;

const ActividadSchema= new Schema({
    actTpo:{type: String, required:true},
    actTtl:{type:String, required:true},    //Titulo de la actividad
    actDes:{type:String, required:true},    //Descripcion de la actividad
    imgCod:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, //def est activo
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Actividad',ActividadSchema);