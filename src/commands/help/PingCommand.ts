import { Message } from 'discord.js';

import Command from '../base/Command';

export class PingCommand extends Command {
    public triggers = ['ping', 'p'];

    public run (message: Message) {
        message.channel.send(`${message.member} Pong!`)
    }
}