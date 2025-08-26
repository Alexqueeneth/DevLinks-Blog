import { ConfigService } from '../common/config.service.js';
import { MongooseAdapter } from './adapters/mongoose.adapter.js';
import { SequelizeAdapter } from './adapters/sequelize.adapter.js';

export class DatabaseService {
    constructor(){
        this.configService = new ConfigService();
        this.mongooseAdapter = new MongooseAdapter();
        this.sequelizeAdapter = new SequelizeAdapter();

        this.adapter = this.configService.getOrThrow('DATABASE_ADAPTER', 'mongoose');
    }

    async connect(){
        if(this.adapter === 'mongoose'){
            await this.mongooseAdapter.connect();
        } else if(this.adapter === 'sequelize'){
            await this.sequelizeAdapter.connect();
        }
    }

    async disconnect(){
        if(this.adapter === 'mongoose'){
            await this.mongooseAdapter.disconnect();
        } else if(this.adapter === 'sequelize'){
            await this.sequelizeAdapter.disconnect();
        }
    }

    async getConnection(){
        if(this.adapter === 'mongoose'){
            return this.mongooseAdapter.getConnection();
        } else if(this.adapter === 'sequelize'){
            return this.sequelizeAdapter.getConnection();
        }
    }
}