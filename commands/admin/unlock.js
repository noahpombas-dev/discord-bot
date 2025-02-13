const Discord = require("discord.js");

module.exports = {
    name: "unlock",
    description: "Unlock a Locked Channel",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) {
            interaction.reply(`
                **Discord BOT**
        
                🚫 Access denied for this command! 🚫
                
        
                ${interaction.user}`);
        } else {
            let unlockEmbed = new Discord.EmbedBuilder()
                .setTitle("<:happy:1033518052177887323> Channel Unlocked!")
                .addFields({ 
                    name: `This channel has been unlocked, everyone can type again.`,
                    value: `<:emoji_9:1033560781314342962> Unlocked by: ${interaction.user}`
                })
                .setColor('Blue');

            interaction.reply({ embeds: [unlockEmbed] }).then(msg => {
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true }).catch(e => {
                    console.log(e);
                    msg.edit(`Oops, something went wrong while trying to unlock this chat.`);
                });
            });
        }
    }
};
