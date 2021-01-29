import { Message } from 'discord.js';

import Command from '../base/Command';

export class GramaticadoCommand extends Command {
    public readonly triggers = ['gramaticado', 'gram'];
    public readonly numberOfParameters = 1;
    public usage = 'Usage: ;gramaticado @<member>'

    public run (message: Message, params: string[]) {
        if (!message.member) return;

        if (params.length > this.numberOfParameters) {
            message.channel.send(this.usage);
            return;
        }

        const [ member ] = params;

        message.channel.send(`O ${member} foi gramaticado 1 vez. <:SAMUW:745829768934588503>`)
    }
}