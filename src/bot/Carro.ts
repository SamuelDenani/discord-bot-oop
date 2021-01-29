import { Client, Message } from 'discord.js';

import MessageHandler from './MessageHandler';

import configs from '../../configs/config.json';

export default class Carro extends Client {
    private readonly messageHandler: MessageHandler;

    constructor (
        messageHandler: MessageHandler
    ) {
        super();

        this.messageHandler = messageHandler;
        
        this.addEventListeners();
    }

    public start() {
        this.login(configs.token);
    }

    private addEventListeners () {
        this.on('ready', this.onReady);
        this.on('message', this.onMessage);
    }

    private onReady () {
        if (!this.user) return;

        this.user.setActivity('Estou online!');
        console.log('--------BOT FUNCIONANDO--------')
    }

    private onMessage (message: Message) {
        this.messageHandler.handle(message);
    }
}