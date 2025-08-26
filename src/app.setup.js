import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createServer } from 'http';
import baseRouter from './routes/index.routes.js';
import { DatabaseService } from './database/database.js';
import { LoggerService } from './common/logger.service.js';
import { ConfigService } from './common/config.service.js';
import { ErrorMiddleware } from './common/middleware/error.middleware.js';
import { sendResponse } from './common/utils.common.js';

class Application {
    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandlers();
        this.databaseService = new DatabaseService();
        this.logger = new LoggerService();
    }

    setupMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ extended: true }));
    }

    setupRoutes() {
        this.app.use('/health', (req, res) => sendResponse(res, 200, true, 'API is running', {
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            message: 'API is running',
        }));
        this.app.use('/api/v1', baseRouter);
    }

    setupErrorHandlers() {
        this.app.use(ErrorMiddleware.handleError);
        this.app.use(ErrorMiddleware.notFound);
    }

    async start() {
        try {
            const port = parseInt(ConfigService.getOrThrow('PORT', 3000), 10);
            await this.databaseService.connect();
            this.server.listen(port, () => {
                this.logger.log(`Server is running on port ${port}`);
            });
        } catch (error) {
            this.logger.error(error, `Error starting the server`);
            process.exit(1);
        }
    }

    async stop() {
        try {
            await this.databaseService.disconnect();
            this.server.close();
            this.logger.log(`Server stopped`);
        } catch (error) {
            this.logger.error(error, `Error stopping the server`);
        }
    }

    async restart() {
        await this.stop();
        await this.start();
    }

    async gracefulShutdown() {
        await this.stop();
        process.exit(0);
    }

    async setupGracefulShutdown() {
        process.on('SIGINT', this.gracefulShutdown.bind(this));
        process.on('SIGTERM', this.gracefulShutdown.bind(this));
    }
}

export default Application;