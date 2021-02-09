const mongoose=require('mongoose');
const { Schema } = mongoose;

const IntervaloHorariochema= new Schema({ 
    intHraIni:  {type: String, required:true},
    intHraFin:  {type: String, required:true},
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('IntervaloHorario',IntervaloHorariochema);