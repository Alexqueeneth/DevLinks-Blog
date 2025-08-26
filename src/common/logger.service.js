import winston from 'winston';

export class LoggerService {
    constructor(){
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
        });
    }

    log(message){
        this.logger.info(message);
    }

    error(message){
        this.logger.error(message);
    }
}