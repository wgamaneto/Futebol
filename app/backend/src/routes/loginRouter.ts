import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const router = Router();

router.get('/validate', (req, res) => loginController.validate(req, res));
router.post('/', (req, res) => loginController.login(req, res));

export default router;
