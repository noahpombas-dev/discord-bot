const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    /** @param {Client} client */
    async execute(client) {
        client.setMaxListeners(0);



        console.log(chalk.blueBright(`${client.user.username} is Online and inside ${client.guilds.cache.size} servers!`));
    }
}