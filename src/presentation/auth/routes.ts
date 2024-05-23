import { Router } from 'express';

import { AuthController } from './controller';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const authController = new AuthController();

    router.post('/auth/login', authController.loginUser);
    router.post('/auth/register', authController.registerUser);

    return router;
  }
}
