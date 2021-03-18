const mongoose=require('mongoose');
const { Schema } = mongoose;

const PagoSchema= new Schema({
    pgoCod      :{type:String,required:true},      // Codigo de pago autogenerado
    pgoPerReg   :{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},      // Persona que registra
    pgoPerAso   :{type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},     // Alumno asociado
    pgoDes      :{type:String,required:false},     // Descripcion de pago
    pgoMes      :{type:String,required:false},     // Mes de pago
    pgoFch      :{type: Date, default:Date.now},   // fecha de operacion
    pgoMto      :{type:Number,required:true},      // Monto de pago
    tpoPgoCod   :{type: Schema.Types.ObjectId,ref: "TipoPago",default:"5e0a8a3b9644411040ebf292"}, //Tipo de pago
    colCod      :{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod      :{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp   :{type: Date, default:Date.now},
});

module.exports= mongoose.model('Pago',PagoSchema);