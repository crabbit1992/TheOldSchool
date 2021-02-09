const mongoose=require('mongoose');
const { Schema } = mongoose;


const BiografiaSchema= new Schema({

    quienesSomos:[
        {
            mision:[{
                misDes:{type:String, required:true},
                misImg:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
            }],
            vision:[{
                visDes:{type:String, required:true},
                visImg:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
            }],
            valores:[{
                valDes:{type:String, required:true},
                valImg:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
            }],
        }
    ],
    actividades:[
        {
            actTtl:{type:String, required:true},
            actDes:{type:String, required:true},
            actImg:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
        }
    ],
    talleres:[
        {
            talTtl:{type:String, required:true},
            talDes:{type:String, required:true},
            talImg:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
        }
    ],
    niveles:[
        {
            NivTtl:{type:String, required:true},
            NivDes:{type:String, required:true},
            nivImg:[{
                imgCod:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
            }]
        }  
    ],
    Infraestructura:[
        {
            infTtl:{type:String, required:true},
            infDes:{type:String, required:true},
            infImg:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false},
        }
    ],
    colCod:{type: Schema.Types.ObjectId,ref: "Colegio", required:true},
    estCod:{type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"},   
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Biografia',BiografiaSchema);