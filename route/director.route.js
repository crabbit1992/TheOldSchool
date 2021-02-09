const express=require('express');
const router=express.Router();

const director=require('../controller/Director.controller');


router.get('/',director.getDirectores);
router.get('/:id',director.getDirector);
router.post('/',director.createDirector);
router.put('/:id',director.editDirector);
router.delete('/:id',director.deleteDirector);

module.exports=router;  