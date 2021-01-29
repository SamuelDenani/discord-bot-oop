import Command from "../commands/base/Command";

export default class CommandCollection {
    private readonly triggers: Map<string, Command> = new Map();
    private readonly commands: Command[] = [];
    
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
        return this.triggers.get(command);
    }
}