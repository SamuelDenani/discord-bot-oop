import { Message } from "discord.js";

import '../discord/Message';
import { config } from '../util/Container'
import CommandCollection from "./CommandCollection";

export default class MessageHandler {
    private readonly commands: CommandCollection;
    
    constructor (commands: CommandCollection) {
        this.commands = commands;
    }

    public handle (message: Message) {
        if (!this.isValidMessage(message)) return;

        const messageToHandle = message;
        messageToHandle.content = message.content.substring(config.prefix.length);

        this.execute(messageToHandle);
    }

    private isValidMessage (message: Message) {
        return (
            !message.author.bot &&
            !message.isDirectMessage() &&
            message.hasPrefix(config.prefix)
        )
    }

    private execute (message: Message) {
        const [command, ...params] = message.content.split(' ');
        const commandToRun = this.commands.get(command);

        if (commandToRun) commandToRun.run(message, params);
    }
}