import CarroBot from '../bot/Carro';
import MessageHandler from '../bot/MessageHandler';
import CommandCollection from '../bot/CommandCollection';
import Config from '../config/Config';
import DataBase from '../database/DataBase';

import {
    HelpCommand,
    PingCommand
} from '../commands/help';

import {
    GramaticadoCommand
} from '../commands/fun';

const commands = [
    // Help Commands
    new HelpCommand,
    new PingCommand,

    // Fun Commands
    new GramaticadoCommand,
]

export const config = new Config(); 

export const db = new DataBase(config.REDIS_URL);

export const commandCollection = new CommandCollection(commands);
const messageHandler = new MessageHandler(commandCollection);
const carroBot = new CarroBot(config, messageHandler);

interface CarroBotContainer {
    config: Config;
    carroBot: CarroBot;
}

export default {
    config,
    carroBot
} as CarroBotContainer;


