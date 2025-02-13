const Discord = require("discord.js");
module.exports = {
    name: 'unban',
    description: '[ 🚫 Unban ] Unban a Player',
    options: [
        {
            name: "user",
            description: "User you want to unban",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
    ],

    run: async(client, interaction) => {
        let noPermission = new Discord.EmbedBuilder()
        .setColor('Red')
        .setTitle('Permission Error!')
        .setDescription(`
        **Discord BOT**

        Access denied for this command!
        

        ${interaction.user}`);

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
            interaction.reply({embeds: [noPermission], ephemeral: true})
        } else {
            let staff = interaction.user.displayName

            let user = interaction.options.getUser("user")

            let unbanSuccess = new Discord.EmbedBuilder()
            .setColor('Yellow')
            .setDescription(`**${user} has been unbanned from the server by ${staff}!**`)
            .setFooter({text: `Responsible: ${staff}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })
            .setTimestamp(new Date())

            
            interaction.guild.members.unban(user).then(async () => {
        

                const channel = await interaction.guild.channels.fetch(logchannelunbans)
                    await interaction.reply({embeds: [unbanSuccess], ephemeral: true})
            })
        }
    }
}
