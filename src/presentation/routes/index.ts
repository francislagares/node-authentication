import { Router } from 'express';

import { env } from '@/config/env';

import { AuthRoutes } from '@/presentation/auth/routes';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use(env.BASE_URL, AuthRoutes.routes);

    return router;
  }
}
