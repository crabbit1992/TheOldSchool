const express=require('express');
const router=express.Router();

const chat=require('../controller/Chat.controller');

router.get('/:idSala',chat.getChats);
router.post('/',chat.postChat);

module.exports=router;  