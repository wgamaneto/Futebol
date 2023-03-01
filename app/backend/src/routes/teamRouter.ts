import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req, res) => teamsController.get(req, res));
router.get('/:id', (req, res) => teamsController.getById(req, res));

export default router;
