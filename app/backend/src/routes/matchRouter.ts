import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

import validateToken from '../middlewares/auth';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req, res) => matchesController.get(req, res));
router.post('/', validateToken, (req, res) => matchesController.add(req, res));
router.patch('/:id/finish', validateToken, (req, res) => matchesController.endGame(req, res));
router.patch('/:id', (req, res) => matchesController.update(req, res));

export default router;
