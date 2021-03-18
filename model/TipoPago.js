const mongoose=require('mongoose');
const { Schema } = mongoose;

const TipoPagoSchema= new Schema({
    tpoPgoNom   :{type:String,required:true},
    tpoPgoDes   :{type:String,required:true},
    tpoPgoMon   :{type:Number,required:true},
    tpoPgoReqMes:{type:String,required:true}, //Activar desactivar mes requerido
    colCod      :{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod      :{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp   :{type: Date, default:Date.now},
});

module.exports= mongoose.model('TipoPago',TipoPagoSchema);