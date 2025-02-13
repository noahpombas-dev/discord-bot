const Discord = require("discord.js");
module.exports = {
    name: 'banlist',
    description: '[ 🚫 Banlist ] See all Banned users.',

    run: async(client, interaction) => {
        let nopermissionembed = new Discord.EmbedBuilder()
        .setTitle("**Erro de Permissão**")
        .setDescription(`
        **Discord BOT**


        🚫 Access Denied! 🚫


        ${interaction.user}
        `)
        .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`})
        .setColor("Red")

        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
            interaction.reply({embeds: [nopermissionembed], ephemeral: true})
        } else {
            let fetchBans = interaction.guild.bans.fetch()
            let banMembers = (await fetchBans).map((member) => "<@" + member.user + ">" + "  | ID " + member.user.id).join("\n")

            let noBannedMembers = new Discord.EmbedBuilder()
            .setDescription("**No Bans...**")
            .setTimestamp(new Date())
            .setColor("Red")
            .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL()}`});

            if(!banMembers) return interaction.reply({embeds: [noBannedMembers], ephemeral: true})

            let BannedMembers = new Discord.EmbedBuilder()
            .setColor("Yellow")
            .setDescription(`${banMembers}
            
            *You need the User ID to unban someone.*
            See all IDs on /banlist
            Unban a user using /unban (user id)
            `)
            .setTimestamp(new Date())
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`});

            interaction.reply({ embeds: [BannedMembers], ephemeral: true })
        }
    }
}