import { Client, Message } from 'discord.js';
import Config from '../config/Config';

import MessageHandler from './MessageHandler';

export default class Carro extends Client {
    private readonly config: Config;
    private readonly messageHandler: MessageHandler;

    constructor (
        config: Config,
        messageHandler: MessageHandler
    ) {
        super();

        this.messageHandler = messageHandler;
        this.config = config;
        
        this.addEventListeners();
    }

    public start() {        
        this.login(this.config.token);
    }

    private addEventListeners () {
        this.on('ready', this.onReady);
        this.on('message', this.onMessage);
    }

    private onReady () {
        if (!this.user) return;

        this.user.setActivity('Estou online!');
    }

    private onMessage (message: Message) {
        this.messageHandler.handle(message);
    }
}