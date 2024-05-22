import logger from '@/utils/logger';

import { env } from '@/config/env';

import { AppRoutes } from '@/presentation/routes';
import { Server } from '@/presentation/server';

export class App {
  public initialize() {
    const app = new Server({
      port: env.PORT,
      routes: AppRoutes.routes,
    });

    app.start();

    App.handleExit();
  }

  private static handleExit(): void {
    process.on('uncaughtException', (error: Error) => {
      logger.error(`There was an uncaught error: ${error}`);
      App.shutDownProperly(1);
    });

    process.on('unhandledRejection', (reason: Error) => {
      logger.error(`Unhandled rejection at promise: ${reason}`);
      App.shutDownProperly(2);
    });

    process.on('SIGTERM', () => {
      logger.error('Caught SIGTERM');
      App.shutDownProperly(2);
    });

    process.on('SIGINT', () => {
      logger.error('Caught SIGINT');
      App.shutDownProperly(2);
    });

    process.on('exit', () => {
      logger.error('Exiting');
    });
  }

  private static shutDownProperly(exitCode: number): void {
    Promise.resolve()
      .then(() => {
        logger.info('Shutdown complete');
        process.exit(exitCode);
      })
      .catch(error => {
        logger.error(`Error during shutdown: ${error}`);
        process.exit(1);
      });
  }
}

const app = new App();

app.initialize();
