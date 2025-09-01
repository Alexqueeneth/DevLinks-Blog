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
import router from '../uploads/upload.route.js';
import authRoutes from './Auth/auth.routes.js';
import userRoutes from './users/user.routes.js';
import postRoutes from './posts/post.routes.js';
import commentRoutes from './comments/comments.routes.js';
import categoriesRoutes from './categories/categories.routes.js';
import tagsRoutes from './tags/tags.routes.js';
import mediaRouter from './media/media.routes.js';
import reactionRoutes from './reactions/reactions.routes.js';
import searchRouter from './search/search.routes.js';
import followerRoutes from "./followers/followers.routes.js";
import bookmarkRoutes from "./bookmarks/bookmarks.routes.js";
import dotenv from 'dotenv'

dotenv.config();

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
        // Root route
        this.app.get('/', (req, res) => sendResponse(res, 200, true, 'DevLinks Blog API', {
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            message: 'DevLinks Blog API is running',
        }));

        // Health check route
        this.app.use('/health', (req, res) => sendResponse(res, 200, true, 'API is running', {
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            message: 'API is running',
        }));

        // API routes
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/users", userRoutes);
        this.app.use("/api/posts", postRoutes);
        this.app.use("/api/comments", commentRoutes);
        this.app.use("/api/categories", categoriesRoutes);
        this.app.use("/api/tags", tagsRoutes);
        this.app.use("/api/media", mediaRouter);
        this.app.use("/api/reactions", reactionRoutes);
        this.app.use("/api/search", searchRouter);
        this.app.use("/api/followers", followerRoutes);
        this.app.use("/api/bookmarks", bookmarkRoutes);
        this.app.use("/api/uploads", router);
        this.app.use("/api/upload", router); // Add singular route alias for upload

        // Legacy/redirect routes
        this.app.get('/posts', (req, res) => res.redirect('/api/posts'));
        this.app.use('/posts', postRoutes); // Direct mount for all /posts methods
        
        // Base router for /api/v1 (if needed for backwards compatibility)
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