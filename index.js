const Discord = require("discord.js");
const client = new Discord.Client({intents: 32767});
const handler = require("./handler/index");
require("dotenv").config()

module.exports = client;
client.discord = Discord;

client.slash = new Discord.Collection();

handler.loadEvents(client);
handler.loadSlashCommands(client);

client.login(process.env.TOKEN);