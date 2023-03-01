import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const router = Router();

router.get('/home', (req, res) => leaderBoardController.get(req, res));
router.get('/away', (req, res) => leaderBoardController.get(req, res));
router.get('/', (req, res) => leaderBoardController.getLeaderBoard(req, res));

export default router;
