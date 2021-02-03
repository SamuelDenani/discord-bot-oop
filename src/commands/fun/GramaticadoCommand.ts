import { Message } from 'discord.js';

import Command from '../base/Command';
import { db } from '../../util/Container';

export class GramaticadoCommand extends Command {
    public readonly triggers = ['gramaticado', 'gram'];
    public readonly numberOfParameters = 1;
    public readonly usage = 'Use o comando assim: **;gramaticado @<member>**'

    public run (message: Message, params: string[]) {
        if (!message.member) return;

        if (params.length > this.numberOfParameters || params.length < this.numberOfParameters) {
            return message.reply(this.usage);
        }

        const [ member ] = params;

        const user = message.mentions.members?.first()?.user

        if (!user) return message.reply('não consegui achar esse usuário! D:')
        
        db.incr(`${user.id}:gramaticado`, (err, reply) => {
            if (!reply) return message.reply('tive um erro no banco de dados :/')

            message.channel.send(`O ${member} foi gramaticado ${reply > 1 ? `${reply} vezes` : `${reply} vez`}. <:SAMUW:745829768934588503>`)
        })
    }
}