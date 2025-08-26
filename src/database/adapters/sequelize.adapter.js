import { Sequelize } from 'sequelize';
import { ConfigService } from '../../common/config.service.js';
import { LoggerService } from '../../common/logger.service.js';

export class SequelizeAdapter {
    constructor(){
        this.sequelize = new Sequelize(ConfigService.getOrThrow('DATABASE_URL'), {
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000,
            },
            define: {
                underscored: true,
                timestamps: true,
                paranoid: true,
            },
            dialectOptions: {
                ssl: ConfigService.get('DATABASE_SSL', false) ? {
                    require: true,
                    rejectUnauthorized: false,
                } : false,
            },
        });
        this.logger = new LoggerService();
    }

    async connect(){
        await this.sequelize.authenticate();
        this.logger.log('Connected to the database');
    }

    async disconnect(){
        await this.sequelize.close();
        this.logger.log('Disconnected from the database');
    }

    getConnection(){
        return  this.sequelize;
    }
}