import { Message } from 'discord.js';

export default abstract class Command {
    abstract readonly triggers: string[];
    readonly numberOfParameters?: number;
    readonly usage?: string;

    abstract run (message: Message, params?: string[]): void;
}