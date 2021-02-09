const express=require('express');
const router=express.Router();

const aulaCurso=require('../controller/AulaCurso.controller');

router.get('/MisCursos/:perRepCod',aulaCurso.getMisCursos);
router.get('/CursosAula/:aulVirCod-:prdCod',aulaCurso.getCursosAula);
router.get('/DocenteCurso/:aulVirCod-:curCod',aulaCurso.getDocenteCurso);
router.get('/AulasDocente/:colCod-:prfCod',aulaCurso.getAulasDocente);
router.get('/CursosAulaDocente/:aulVirCod-:prfCod-:colCod',aulaCurso.getCursosAulaDocente);
router.get('/DocentesPorAula/:aulVirCod-:prdCod',aulaCurso.getDocentesPorAula);

router.post('/',aulaCurso.createAulaCurso);
router.put('/editDocenteCurso/:id',aulaCurso.editDocenteCurso);
router.delete('/:id',aulaCurso.deleteAulaCurso);

module.exports=router;  