import mongoose from 'mongoose';
import { ConfigService } from '../../common/config.service.js';
import { LoggerService } from '../../common/logger.service.js';

export class MongooseAdapter {
    constructor(){
        this.mongoose = mongoose;
        this.mongoose.set('strictQuery', false);
        this.logger = new LoggerService();
    }

    async connect(){
        const dbUrl = ConfigService.getOrThrow('MONGODB_URI');
        await this.mongoose.connect(dbUrl);
        this.connection = this.mongoose.connection;
        this.logger.log('Connected to the database');
    }

    async disconnect(){
        await this.mongoose.disconnect();
        this.connection = null;
        this.logger.log('Disconnected from the database');
    }

    async getConnection(){
        if(!this.connection) await this.connect();
        return this.connection;
    }
}