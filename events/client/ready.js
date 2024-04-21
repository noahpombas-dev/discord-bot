const client = require("../../index");
const { ActivityType } = require('discord.js')
const chalk = require("chalk");
const { joinVoiceChannel } = require("@discordjs/voice");
const Discord = require('discord.js')

module.exports = {
  name: 'ready',
  once: true,

  /**
   * @param {Client} client 
   */
  async execute(client) {

    let status = [
      `by info@noahpombas.ch`,
      `Spoiler: novo Servidor de Minecraft brevemente`
    ],
      i = 0
    setInterval(() => {
      client.user.setActivity(`${status[i++ % status.length]}`, {
        type: ActivityType.Streaming
      })
    }, 5000);



    
    console.log(chalk.blueBright(`[READY] Bot Online!`));
  }
}
