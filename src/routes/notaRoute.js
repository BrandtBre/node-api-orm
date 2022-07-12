import { Router } from 'express';
import { isAuthenticated } from '../utils/isAuthenticated';
const nota = require('../controllers/nota.controller');
const router = Router();

router.get('/:id', nota.getNota);

router.post('/create', isAuthenticated, nota.createNota);

router.post('/delete', nota.deleteNota);

router.post('/update/:id', nota.updateNota);

export default router;
