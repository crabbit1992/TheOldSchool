const Chat = require('../model/Chat');
const PersonaRepositorio = require('../model/PersonaRepositorio');
const ChatCtrl = {};

ChatCtrl.getChats = async (req, res) => {

    const {idSala}=req.params;
    const chat = await Chat.find({room:idSala})
    .populate('perRepCod');


    var arrayChat = [];
    var objChat= {};

    for(let i=0; i<chat.length;i++){

        objChat={
            room:  chat[i].room,
            Name: chat[i].perRepCod.perRepNom + ", " + chat[i].perRepCod.perRepApe,
            message:  chat[i].message,
            date:     chat[i].date,
            time:    chat[i].time
        }
        arrayChat.push(objChat);
    }
    console.log(arrayChat);
    res.json(arrayChat);
};

ChatCtrl.postChat = async (req, res) => {

    let GP={
        room:         req.body.room,
        perRepCod:    req.body.perRepCod,
        message:      req.body.message,
        date:         req.body.date,
        time:         req.body.time,
    }

    const per=await PersonaRepositorio.find({_id: GP.perRepCod});
    console.log(per);
    
    const newChat=new Chat(GP);
    const resChat=await newChat.save();
    console.log(resChat);  
    res.json({status:200}); 
};



module.exports = ChatCtrl;