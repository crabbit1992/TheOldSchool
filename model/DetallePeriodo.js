const mongoose=require('mongoose');
const { Schema } = mongoose;

const DetallePeriodoSchema= new Schema({
    prdCod      :{type: Schema.Types.ObjectId,ref: "Periodo", required:true},
    tpoPrdCod   :{type: Schema.Types.ObjectId,ref: "TipoPeriodo", required:true}, //Tipo de periodo
    detPrdSgt   :{type: String,required:true},      // Segmmento del periodo (primer, segundo, tercer o cuarto bimeste)
    detPrdIni   :{type: Date, required:true},       // Inicio del segmento del periodo
    detPrdFin   :{type: Date, required:true},       // Fin del segmento del periodo
    estCod      :{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp   :{type: Date, default:Date.now},
});

module.exports= mongoose.model('DetallePeriodo',DetallePeriodoSchema);