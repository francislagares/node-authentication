import { Router } from 'express';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.post('/auth/login', (req, res) => {
      res.json('Login');
    });
    router.post('/auth/register', (req, res) => {
      res.json('Register');
    });

    return router;
  }
}
