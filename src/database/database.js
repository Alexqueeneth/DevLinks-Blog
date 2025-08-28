import { ConfigService } from '../common/config.service.js';
import { MongooseAdapter } from './adapters/mongoose.adapter.js';
import { SequelizeAdapter } from './adapters/sequelize.adapter.js';

export class DatabaseService {
    constructor(){
        this.configService = new ConfigService();
        this.adapter = ConfigService.get('DATABASE_ADAPTER', 'mongoose');
        
        if(this.adapter === 'mongoose'){
            this.mongooseAdapter = new MongooseAdapter();
        } else if(this.adapter === 'sequelize'){
            this.sequelizeAdapter = new SequelizeAdapter();
        }
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