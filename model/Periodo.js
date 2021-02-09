const mongoose=require('mongoose');
const { Schema } = mongoose;

const PeriodoSchema= new Schema({
    prdAnio     :{type:String,required:true},
    prdFchIni   :{type:Date, required:true},
    prdFchFin   :{type:Date, required:true},
    tpoPrdCod   :{type: Schema.Types.ObjectId,ref: "TipoPeriodo", required:true},
    colCod      :{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod      :{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp   :{type: Date, default:Date.now},
});

module.exports= mongoose.model('Periodo',PeriodoSchema);