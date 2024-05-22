import express, { Application, json, Router, urlencoded } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import logger from '@/utils/logger';

import { env } from '@/config/env';

import { Options } from '@/types';

export class Server {
  public readonly app = express();
  public readonly port: number;
  public readonly routes: Router;

  constructor(options: Options) {
    const { port = 3000, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.appRoutes(this.app);
    this.startServer(this.app);
    this.initializeSwagger();
  }

  private securityMiddleware(app: Application): void {
    app.use(json());
    app.use(urlencoded({ extended: true, limit: '50mb' }));
  }

  private appRoutes(app: Application): void {
    app.use(this.routes); // Ensure you're using the provided routes
  }

  private startServer(app: Application): void {
    logger.info(`------ NODE_ENV: ${env.NODE_ENV} ------`);
    logger.info(`Server has started with process ${process.pid}`);
    app.listen(this.port, () => {
      // Use this.port here
      logger.info(`Server listening on port ${this.port}`);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.3',
        info: {
          title: 'API Documentation',
          version: '1.0.0',
          description: 'REST API docs',
        },
        servers: [
          {
            url: `${env.HOST}:${env.PORT}${env.BASE_URL}`,
          },
        ],
      },
      apis: ['./swagger.yaml'],
    };

    const swaggerSpecs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

    logger.info(`Docs are available at ${env.HOST}:${env.PORT}/api-docs`);
  }
}
