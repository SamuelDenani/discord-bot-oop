import CarroBot from '../bot/Carro';
import MessageHandler from '../bot/MessageHandler';
import CommandCollection from '../bot/CommandCollection';
import Config from '../config/Config';

import {
    PingCommand
} from '../commands/help';

import {
    GramaticadoCommand
} from '../commands/fun';

const commands = [
    // Help Commands
    new PingCommand,

    // Fun Commands
    new GramaticadoCommand,
]

export const config = new Config(); 

const commandCollection = new CommandCollection(commands);
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