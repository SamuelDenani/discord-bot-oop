import Command from "../commands/base/Command";

interface CommandInfos {
    triggers: string;
    usage: string;
}
export default class CommandCollection {
    private readonly commands: Command[] = [];
    private readonly triggers: Map<string, Command> = new Map();
    
    constructor (commands: Command[]) {
        this.registerCommands(commands);
    }

    private registerCommands (commands: Command[]) {
        this.commands.push(...commands);
        commands.forEach(command => this.registerTriggers(command));
    }

    private registerTriggers (command: Command) {
        command.triggers.forEach(trigger => this.triggers.set(trigger, command));
    }

    public get (command: string) {
        console.log(command,'-----', this.commands);
        return this.triggers.get(command);
    }

    public index () {
        let commands: CommandInfos[]= [];

        this.commands.forEach((command: Command) => commands.push({
            triggers: command.triggers.join(', '),
            usage: command.usage ?? 'Sem descrição'
        }))

        return commands;
    }
}