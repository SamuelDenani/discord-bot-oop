import { Message } from 'discord.js';

import Command from '../base/Command';

export class CoinFlipCommand extends Command {
    public readonly triggers = ['coinflip', 'cf'];
    public readonly numberOfParameters = 0;
    public readonly usage = 'Use o comando e ele retorna cara ou coroa';

    public run (message: Message) {
        if (!message.member) return;
        
        const randomNumber = Math.ceil(Math.random() * 10);
        const isRandomNumberOdd = !(randomNumber % 2 === 0);

        message.reply(`o resultado foi: **${isRandomNumberOdd ? 'cara' : 'coroa'}**!`);
    }
}