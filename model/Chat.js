const mongoose=require('mongoose');
const { Schema } = mongoose;

const ChatSchema= new Schema({
        room:            {type: String, required:true},
        perRepCod:       {type: Schema.Types.ObjectId,ref: "PersonaRepositorio", required:true},
        message :        {type: String, required:true},
        img:             {type: String, required:false},
        date:            {type: String}, 
        time:            {type: String},
        estCod:          {type: Schema.Types.ObjectId,ref: "Estado",default:"5e0a8a3b9644411040ebf292"}, 
});

module.exports= mongoose.model('Chat',ChatSchema);