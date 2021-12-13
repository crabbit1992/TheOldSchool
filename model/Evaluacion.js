const mongoose=require('mongoose');
const { Schema } = mongoose;

const EvaluacionSchema= new Schema({
    evaPta:{type:String, required:true},  
    evaRpt:[
        {
            evaRpt:{type:String, required:true}
        }
    ],  
    imgCod:{type: Schema.Types.ObjectId,ref: "ImgAll", required:false},        //imagen 
    evaOpc:[
        {
            evaOpc:{type:String, required:true},
        }
    ],
    evaPtsEqt:{type:Number, required:true},
    nroOrd:{type: Number, required:false},
    libCod:{type: Schema.Types.ObjectId,ref: "Libro", required:true},  //codigo del libro
    temCod:{type: Schema.Types.ObjectId,ref: "Tema", required:true},  //codigo del libro
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},            //colegio
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
}, { timestamps: true });

module.exports= mongoose.model('Evaluacion',EvaluacionSchema);