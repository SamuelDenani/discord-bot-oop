import CarroBot from './bot/Carro';
import Container from './util/Container';

class DiscordCarroBot {
    private readonly bot: CarroBot;

    constructor () {
        this.bot = Container.carroBot;

        this.start();
    }

    private start () {
        this.bot.start();
    }
}

new DiscordCarroBot();