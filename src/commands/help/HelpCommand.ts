import { Message, MessageEmbed } from 'discord.js';

import Command from '../base/Command';
import { commandCollection } from '../../util/Container';

export class HelpCommand extends Command {
    public readonly triggers = ['help', 'h'];
    public readonly numberOfParameters = 1;
    public readonly usage = 'Use o comando sozinho: **;help**; ou seguido de algum comando: **;help <comando>**';

    public run (message: Message, params: string[]) {
        if (!message.member) return;

        if (params.length > this.numberOfParameters) return message.reply(this.usage);

        if (params.length == 0) {
            const commands = commandCollection.index();
            const reply = new MessageEmbed({
                color: '#b967ff',
                title: 'Estes são os comandos disponíveis',
                description: 'Abaixo estão todos os comandos disponíveis junto com o seu uso correto:',
                fields: [
                    { name: '\u200B', value: '\u200B',  inline: false},
                ],
                footer: {
                    text: 'Desenvolvido por Samuel Denani.',
                    iconURL: 'https://avatars.githubusercontent.com/u/37946616?s=460&u=45e7fd5abd3556dee1139aa1574388ae5e43340a&v=4'
                },
            });
    
            commands.forEach(command => {
                reply.addField(command.triggers, command.usage);
            })
    
            reply.addField('\u200B', '\u200B', false);
    
            return message.reply(reply);
        }
        
        const [ command ] = params;
        const commandInfos = commandCollection.get(command);

        message.reply(commandInfos ? (commandInfos?.usage ?? 'Esse comando não tem descrição :(') : 'Comando não encontrado');
    }
}