const Discord = require("discord.js");
module.exports = {
    name: 'remove',
    description: '[ remove ] Remove someone from the ticket!',
    options: [
        {
            name: "user",
            description: "Select the user you want to remove from the ticket!",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
    ],

    run: async(client, interaction) => {
        let noPermissionEmbed = new Discord.EmbedBuilder()
        .setTitle("**Permission Error**")
        .setDescription(`
        **Discord BOT**


        🚫 Access denied for this command! 🚫


        ${interaction.user}
        `)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setColor("Red")

        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            interaction.reply({embeds: [noPermissionEmbed], ephemeral: true})
        } else {
            let user = interaction.options.getUser("user");

            interaction.channel.permissionOverwrites.edit(user.id, { ViewChannel: false });

            let embed = new Discord.EmbedBuilder()
            .setTitle("Tickets")
            .setDescription(`${user} has been removed from the ticket!`);

            interaction.reply({content: `DONE!`, ephemeral: true})
            interaction.channel.send({embeds: [embed]})
        }
    }
}
