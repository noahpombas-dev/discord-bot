const Discord = require("discord.js");
module.exports = {
    name: 'add',
    description: 'Give a user permissions to see the actual channel.',
    options: [
        {
            name: "user",
            description: "Select User!",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },

    ],

    run: async(client, interaction) => {
        let nopermissionembed = new Discord.EmbedBuilder()
        .setTitle("**Permission Error**")
        .setDescription(`
        **Discord BOT**


        🚫 Access Denied! 🚫


        ${interaction.user}
        `)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setColor("Red")

        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) {
            interaction.reply({embeds: [nopermissionembed], ephemeral: true})
        } else {
            let user = interaction.options.getUser("user");

            interaction.channel.permissionOverwrites.edit(user.id, { ViewChannel: true });

            let embed = new Discord.EmbedBuilder()
            .setTitle("Tickets")
            .setDescription(`${user} foi adicionado ao Ticket!`);

            interaction.reply({content: `FEITO!`, ephemeral: true})
            interaction.channel.send({embeds: [embed]})
        }
    }
}