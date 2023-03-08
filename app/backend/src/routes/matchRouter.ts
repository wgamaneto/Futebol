import { Request, Response, Router } from 'express';
import { MatchController } from '../controllers';
import validateToken from '../middlewares/auth';

const matcheController = new MatchController();
const matchRouter = Router();
matchRouter.post(
  '/',
  validateToken,
  (req: Request, res: Response) => matcheController.CreateMatche(req, res),
);
matchRouter.get('/', (req: Request, res: Response) => matcheController.getAllMatches(req, res));
matchRouter.patch(
  '/:id',
  validateToken,
  (req: Request, res: Response) => matcheController.EditMatches(req, res),
);
matchRouter.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matcheController.finishMatche(req, res),
);
export default matchRouter;
