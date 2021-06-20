import { MessageEmbed } from 'discord.js';
import { Message } from 'discord.js';

import createHttpClient from '../../services/api';
import Command from '../base/Command';

interface SubcommandsInterface {
    [method: string]: (params: string[], message: Message) => void
}

interface CoinData {
    code: string;
    name: string;
    high: string;
    low: string;
    varbid: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
}

interface AllCoins {
    [coinCode: string]: CoinData;
}

export class CoinsCommand extends Command {
    public readonly triggers = ['coins', 'c'];
    public readonly numberOfParameters = 1;
    public readonly usage = 'Comando em desenvolvimento';

    private coinsApi;

    private subcommands: SubcommandsInterface = {
        all: (coins: string[], message: Message) => this.getAll(coins, message),
    }

    constructor() {
        super();
        this.coinsApi = createHttpClient({
            baseURL: 'https://economia.awesomeapi.com.br/json'
        });
    }

    public run (message: Message, params: string[]) {
        if (!message.member) return;

        if (params.length < this.numberOfParameters) {
            return message.reply(this.usage);
        }

        const [subcommand, ...coins] = params;

        if (!Object.keys(this.subcommands).includes(subcommand)) {
            return message.reply('Não existe esse subcomando');
        }

        this.subcommands[subcommand](coins, message);
    }

    private async getAll (coins: string[], message: Message) {
        try {
            const escapedCoins = coins.map(coin => `${coin.toUpperCase()}-BRL`);
    
            const coinsData: AllCoins = await this.coinsApi.get(`/all/${escapedCoins.join(',')}`);

            const reply = new MessageEmbed({
                color: '#3489ba',
                title: 'Essas são as moedas'
            });

            Object.values(coinsData).forEach(({ name, code, high, low, bid, ask }) => reply.addFields(
                { name: `${name}`, value: code },
                { name: 'Alta', value: high, inline: true },
                { name: 'Baixa', value: low, inline: true },
                { name: 'Compra', value: bid, inline: true },
                { name: 'Venda', value: ask, inline: true },
                { name: '\u200B', value: '\u200B' },
            ));

            reply.setFooter("\u3000".repeat(20)+"|")
            
            return message.reply(reply)
        } catch (error) {
            message.reply('Deu ruim na requisição');
            return console.log(error);
        }
    }
}