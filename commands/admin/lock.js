const Discord = require("discord.js")

module.exports = {
    name: "lock",
    description: "Lock a Channel",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            interaction.reply(`
                **Dicord BOT**
        
                🚫 Access denied for this command! 🚫
                
                ${interaction.user}`)
        } else {
            let embed = new Discord.EmbedBuilder()
                .setTitle("Channel locked.")
                .setColor('Blue')
                .addFields()
            interaction.reply({ embeds: [embed] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }).catch(e => {
                    console.log(e)
                    interaction.editReply(`Oops, something went wrong while trying to lock this chat.`)
                })
            })

        }
    }
}
