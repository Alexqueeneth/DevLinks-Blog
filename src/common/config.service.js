import { config } from 'dotenv';
import { NotFoundError } from './errors.common.js';



export class ConfigService {
    constructor(){
        config({ quiet: true });
    }

    static get(key, defaultValue = null){
        return process.env[key] || defaultValue;
    }

    static getOrThrow(key, defaultValue = null){
        const value = this.get(key, defaultValue);
        if(!value) throw new NotFoundError(`The required key ${key} does not exist in the environment variables. Please check the .env file.`);
        return value;
    }
}