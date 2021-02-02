import Redis from 'ioredis';

export default class DataBase extends Redis {
    
    constructor (url: string) {
        super(url);

        this.addEventListeners();
    }

    private addEventListeners () {
        this.on('connect', () => console.log('---REDIS CONNECTED---'));
        this.on('ready', () => console.log('REDIS READY...'));
    }
}