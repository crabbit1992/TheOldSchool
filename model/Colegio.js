const mongoose=require('mongoose');
const { Schema } = mongoose;

const ColegioSchema= new Schema({
    colUrl:{type:String, required:false},
    colNom:{type:String, required:true},
    colRuc:{type:String, required:true},
    colBioQss:{type:Boolean, required:false,default:true},
    colBioAct:{type:Boolean, required:false,default:true},
    colBioNiv:{type:Boolean, required:false,default:true},
    colBioTal:{type:Boolean, required:false,default:true},
    colBioInf:{type:Boolean, required:false,default:true},
    colImgEmb:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false}, //Emblema del colegio (Imagen)
    colImgPfl:{type: Schema.Types.ObjectId,ref: "ColegioImg", required:false}, //Imagen que se mostrara en el perfil de busquedas
    timestamp:{type: Date, default:Date.now},
});

module.exports= mongoose.model('Colegio',ColegioSchema);