const Discord = require("discord.js");
module.exports = {
    name: 'user-info',
    description: 'Information about a user',
    options: [
        {
            name: "user", 
            description: "Enter a user.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
    ],

    run: async(client, interaction) => {
	const user = interaction.options.getUser('user')
    const member = await interaction.guild.members.fetch(user.id)
    const icon = user.displayAvatarURL()
    const tag = user.tag
    
    const embed = new Discord.EmbedBuilder()
    .setTitle(`Informations about ${user.username}`)
    .setColor("Aqua")
    .setAuthor({ name: tag, iconURl: icon})
    .setThumbnail(icon)
    .addFields({ name: "User", value: `${user}`, inline: false})
    .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false})
    .addFields({ name: "Joined Server", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, inline: true})
    .addFields({ name: "Account Created", value: `<t:${parseInt(user.createdAt / 1000)}:R>`, inline: true})
    .setFooter({ text: `User ID: ${user.id}`})
    .setTimestamp()


        interaction.reply({embeds: [embed], ephemeral: true})
    }
}

