const Discord = require("discord.js");
module.exports = {
    name: 'server-info',
    description: 'Information about the server',

    run: async(client, interaction) => {
        const { guild } = interaction
		const { members } = guild
        const { name, ownerId, createdTimestamp, memberCount } = guild
        const icon = guild.iconURL()
        const roles = guild.roles.cache.size
        const emojis = guild.emojis.cache.size
        const id = guild.id
        
        let baseVerify = guild.VerificationLevel
        
        if(baseVerify == 0) baseVerify = "None"
        if(baseVerify == 1) baseVerify = "Low"
        if(baseVerify == 2) baseVerify = "Medium"
        if(baseVerify == 3) baseVerify = "High"
        if(baseVerify == 4) baseVerify = "Very High"
        
        const embed = new Discord.EmbedBuilder()
        .setColor("Aqua")
        .setThumbnail(icon)
        .setAuthor({ name: name, iconURL: icon})
        .setFooter({ text: `Server ID: ${id}` })
		.setTimestamp()
		.addFields({ name: "Name", value: `${name}`, inline: false})
        .addFields({ name: "Criation Date", value: `<t:${parseInt(createdTimestamp / 1000)}:R>`, inline: true})
        .addFields({ name: "CEO:", value: `<@${ownerId}>`, inline: true})
        .addFields({ name: "Members:", value: `${memberCount}`, inline: true})
        .addFields({ name: "Roles:", value: `${roles}`, inline: true})
        .addFields({ name: "Emojis:", value: `${emojis}`, inline: true})
        .addFields({ name: "Boosts:", value: `${guild.premiumSubscriptionCount}`, inline: true})
        
        interaction.reply({embeds: [embed], ephemeral: true})
        
        
        }
    
}