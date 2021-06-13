import { Message, MessageEmbed } from 'discord.js';
import { TwitterClient } from 'twitter-api-client'

import Command from '../base/Command';
import { config } from '../../util/Container';

interface SubcommandsInterface {
    [method: string]: (message: Message, rest: any) => void
}

export class TwitterCommand extends Command {
    public readonly triggers = ['twitter', 'tt'];
    public readonly numberOfParameters = 1;
    public readonly usage = 'Comando em desenvolvimento, por enquanto os subcomandos são: **trends**, **search** e **user**';

    private twitterClient;

    private subcommands: SubcommandsInterface = {
        trends: (message: Message) => this.trends(message),
        search: (message: Message, searchTerm: string) => this.search(message, searchTerm),
        user: (message: Message, user: string) => this.searchUser(message, user),
    }
    
    constructor() {
        super();
        this.twitterClient = new TwitterClient({
            apiKey: config.twitterApiKey,
            apiSecret: config.twitterApiSecret,
            accessToken: config.twitterAccessToken,
            accessTokenSecret: config.twitterAccessTokenSecret,
        })
    }

    public async run (message: Message, params: string[]) {
        if (!message.member) return;
        
        if (params.length < this.numberOfParameters) {
            return message.reply(this.usage);
        }

        const [subcommand, ...rest] = params;

        if (!Object.keys(this.subcommands).includes(subcommand)) {
            return message.reply(this.usage);
        }

        this.subcommands[subcommand](message, rest);
    }

    private async trends (message: Message) {
        try {
            const [{ trends }] = await this.twitterClient.trends.trendsPlace({ id: 23424768 });

            const reply = new MessageEmbed({
                color: '#3489ba',
                title: 'Essas são as trends no Brasil agora:',
                description: "Para ver no twitter, [clique aqui](https://twitter.com/explore/tabs/trending 'Twitter Trends')"
            })

            trends.splice(0, 8).forEach(({name, url, tweet_volume: tweetVolume}) => {
                reply.addFields([
                    {
                        name,
                        value: `[${tweetVolume ?? 'Sem contagem de'} tweets](${url} '${name}')`
                    }
                ])
            })
            
            message.reply(reply);
        } catch (err) {
            console.log('deu ruim: ', err);
            message.reply('deu ruim');
        }
    }

    private async search (message: Message, searchTerm: string) {
        try {
            const { statuses } = await this.twitterClient.tweets.search({ q: searchTerm })

            let index = 0;
            
            const { user: { name, screen_name, profile_image_url_https, followers_count, verified }, retweet_count, favorite_count, text, id_str, created_at } = statuses[index];

            const reply = new MessageEmbed({
                color: '#3489ba',
                author: {
                    name,
                    icon_url: profile_image_url_https,
                    url: `https://twitter.com/${screen_name}`
                },
                description: text,
                timestamp: new Date(created_at).valueOf(),
                footer: {
                    text: `https://twitter.com/${screen_name}/status/${id_str}`
                },
                fields: [
                    {
                        name: 'Likes: ',
                        value: favorite_count,
                        inline: true
                    },
                    {
                        name: 'Retweets: ',
                        value: retweet_count,
                        inline: true
                    }
                ]
            })

            message.reply(reply);
        } catch (err) {
            console.log('deu ruim: ', err);
            message.reply('deu ruim');
        }
    }

    private async searchUser (message: Message, user: string) {
        try {
            const users = await this.twitterClient.accountsAndUsers.usersSearch({ q: user })

            if (!users.length) {
                return message.reply('Nenhum usuário encontrado')
            }
            
            let index = 0;

            const { name, screen_name, description, url, followers_count, friends_count, verified, statuses_count, profile_image_url_https, profile_banner_url } = users[index];

            const reply = new MessageEmbed({
                title: name,
                description,
                author: {
                    iconURL: profile_image_url_https,
                    name: screen_name,
                    url: `https://twitter.com/${screen_name}`
                },
                image: {
                    url: profile_banner_url
                },
                fields: [
                    {
                        name: 'Followers: ',
                        value: followers_count,
                        inline: true
                    },
                    {
                        name: 'Following: ',
                        value: friends_count,
                        inline: true
                    },
                    {
                        name: 'Tweets: ',
                        value: statuses_count,
                        inline: true
                    },
                ]
            })

            if (url) {
                reply.addField('Website: ', url);
            }
            
            message.reply(reply)
        } catch (err) {
            console.log('deu ruim', err);
            message.reply('deu ruim')
        }
    }
}