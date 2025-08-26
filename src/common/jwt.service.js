import jwt from 'jsonwebtoken';
import { ConfigService } from './config.service.js';
import { BaseError, UnauthorizedError } from './errors.common.js';
import { LoggerService } from './logger.service.js';

export class JwtService {
    constructor(){
        this.logger = new LoggerService();
    }

    static verifyToken(token){
        try {
            return jwt.verify(token, ConfigService.getOrThrow('JWT_SECRET'));
        } catch (error) {
            this.logger.error('JWT verification error:', error);
            throw new UnauthorizedError('Invalid or expired token');
        }
    }

    static generateToken(payload){
        try {
            return jwt.sign(payload, ConfigService.getOrThrow('JWT_SECRET'), {
                expiresIn: ConfigService.getOrThrow('JWT_EXPIRES_IN'),
            });
        } catch (error) {
            this.logger.error('JWT generation error:', error);
            throw new BaseError('Failed to generate token', 500);
        }
    }
}