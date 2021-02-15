import { Message, MessageEmbed } from "discord.js";

import createHttpClient from '../../services/api';
import Command from '../base/Command';
import { config } from '../../util/Container';

interface SubcommandsInterface {
    [method: string]: (word: string, message: Message) => void
}

interface Definition {
    definitions: {
        definition: string,
        partOfSpeech: string
    }[]
}

export class WordCommand extends Command {
    public readonly triggers = ['word', 'w'];
    public readonly numberOfParameters = 1;
    public readonly usage = 'Comando em criação';

    private wordsApi;

    subcommands: SubcommandsInterface = {
        def: (word: string, message: Message) => this.getDefinition(word, message)
    }

    constructor() {
        super();
        this.wordsApi = createHttpClient({
            baseURL: 'https://wordsapiv1.p.rapidapi.com/words',
            headers: {
                'X-Mashape-Key': config.wordsApiKey,
            }
        })
    }

    public run (message: Message, params: string[]) {
        if (!message.member) return;
        
        if (params.length < this.numberOfParameters) {
            return message.reply(this.usage);
        }

        const [subcommand, word] = params;

        if (!Object.keys(this.subcommands).includes(subcommand)) {
            return message.reply(this.usage);
        }

        this.subcommands[subcommand](word, message);
    }

    private async getDefinition (word: string, message: Message) {
        try {
            const wordData: Definition = await this.wordsApi.get(`/${word}/definitions`);

            const reply = new MessageEmbed({
                color: '#3489ba',
                title: `Essas são as definições de "${word}"`,
            })

            wordData.definitions.forEach(({ definition, partOfSpeech }, index) => reply.addField(`Definição ${index + 1} [${partOfSpeech}]`, definition.charAt(0).toUpperCase() + definition.substring(1)))

            return message.reply(reply);
        } catch (error) {
            message.reply('Infelizmente ocorreu um erro na requisição da sua busca.')
            return console.log(error)
        }
    }
}