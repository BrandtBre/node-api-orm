import { Router } from 'express';
const funcionario = require('../controllers/funcionario.controller');
const router = Router();

router.get('/:id', funcionario.getFuncionario);

router.post('/create', funcionario.createFuncionario);

router.post('/delete', funcionario.deleteFuncionario);

router.post('/update/:id', funcionario.updateFuncionario);

export default router;
