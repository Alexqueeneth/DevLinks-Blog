import winston from 'winston';

export class LoggerService {
    constructor(){
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        });
    }

    log(message){
        this.logger.info(message);
    }

    error(message){
        this.logger.error(message);
    }
}