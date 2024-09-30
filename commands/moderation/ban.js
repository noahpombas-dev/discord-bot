const Discord = require("discord.js")

module.exports = {
    name: "ban",
    description: `Ban a User`,
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "mention the user that you want to ban",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
            
        },
        {
            name: "reason",
            description: "Ban reason!",
            type: Discord.ApplicationCommandOptionType.String
        },
    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser("user");
        let reason = interaction.options.getString("reason");
        let member = await interaction.guild.members.fetch(user.id)
        let banmessage;
        if(reason == "" || reason == null){
            reason = "Ban Hammer has spoken!" 
        }


        
        const banEmbed = new Discord.EmbedBuilder()
            .setColor('#ff0000') // Red color for bans
            .setTitle(`User Banned: ${user.username}#${user.discriminator}`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .addFields(
                { name: 'User ID', value: user.id, inline: true },
                { name: 'Account Created', value: user.createdAt.toDateString(), inline: true },
                { name: 'Joined Server', value: member.joinedAt.toDateString(), inline: true },
                { name: 'Roles', value: member.roles.cache.size > 0 ? member.roles.cache.map(role => role.name).join(', ') : 'No Roles', inline: true },
                { name: 'Status', value: user.presence?.status || 'offline', inline: true },
                { name: 'Activity', value: user.presence?.activities.length ? user.presence.activities[0].name : 'None', inline: true },
                { name: 'Banned by', value: `${interaction.user.username}#${interaction.user.discriminator}`, inline: true },
                { name: 'Ban Reason', value: reason, inline: true }
            )
            .setFooter({ text: `Action performed on ${new Date().toLocaleDateString()}`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
        

        
        interaction.reply({content: `${user}`, embeds: [banEmbed], ephemeral: true})
        console.log(`Olá ${interaction.user}`)
    }
}