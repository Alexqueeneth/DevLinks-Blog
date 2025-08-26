import { BaseError, NotFoundError, ValidationError } from '../errors.common.js';
import { LoggerService } from '../logger.service.js';
import { ConfigService } from '../config.service.js';

const logger = new LoggerService();

export class ErrorMiddleware {
    static handleError(err, req, res, next){
        if(err instanceof BaseError){
            logger.error({
                error: err.message,
                stack: err.stack,
                method: req.method,
                url: req.originalUrl,
                body: req.body,
                user: req.user?.id,
                timestamp: new Date().toISOString(),
            });
            return res.status(err.status).json(err.toResponse());
        } else if(err instanceof ValidationError){
            return res.status(422).json(err.toResponse());
        }

        logger.error({
            error: err.message,
            stack: err.stack,
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            user: req.user?.id,
            timestamp: new Date().toISOString(),
        });

        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            ...(ConfigService.get('NODE_ENV') === 'development' && { stack: err.stack }),
        });
    }

    static notFound(req, res, next){
        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        const method = req.method.toLowerCase();
        const error = new NotFoundError(`Route ${url} not found or does not exist for ${method} method`);
        logger.error({
            error: error.message,
            stack: error.stack,
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            user: req.user?.id,
            timestamp: new Date().toISOString(),
        });
        next(error);
    }
}