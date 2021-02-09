const express=require('express');
const router=express.Router();

const bioInfraestructura=require('../controller/BioInfraestructura.controller');

router.get('/:colCod-:infTpo',bioInfraestructura.getBioInfraestructura);
router.get('/infraestructurasAll/:colCod',bioInfraestructura.getBioInfraestructuras);
router.post('/',bioInfraestructura.createBioInfraestructura);
router.put('/:id',bioInfraestructura.editBioInfraestructura);
router.delete('/:id',bioInfraestructura.deleteBioInfraestructura);

module.exports=router;