const mongoose=require('mongoose');
const { Schema } = mongoose;

const TipoNotaCursoSchema= new Schema({ 
    tpoNtaCod:  {type: Schema.Types.ObjectId,ref: "TipoNota",required:true},
    aulVirCod:  {type: Schema.Types.ObjectId,ref: "AulaVirtual",required:true},
    curCod:     {type: Schema.Types.ObjectId,ref: "NucleoCurso", required:true}, // nucleo           
    prdCod:     {type: Schema.Types.ObjectId,ref: "Periodo", required:true}, 
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('TipoNotaCurso',TipoNotaCursoSchema);