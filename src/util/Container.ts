import CarroBot from '../bot/Carro';
import MessageHandler from '../bot/MessageHandler';
import CommandCollection from '../bot/CommandCollection';

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

const commandCollection = new CommandCollection(commands);
const messageHandler = new MessageHandler(commandCollection);
const carroBot = new CarroBot(messageHandler);

export default {
    carroBot
}