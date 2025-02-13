const Discord = require("discord.js");
module.exports = {
    name: 'ban',
    description: '[ 🚫 Ban ] Ban User',
    options: [
        {
            name: "user",
            description: "Select an user",
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Ban Reason",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async(client, interaction) => {
        let nopermission = new Discord.EmbedBuilder()
        .setColor('Red')
        .setTitle('Command Error!')
        .setDescription(`
        **Discord BOT**

        🚫 Access Denied! 🚫
        

        ${interaction.user}`);

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) {
            interaction.reply({embeds: [nopermission], ephemeral: true})
        } else {
            let member = interaction.options.getUser("user");
            let reason = interaction.options.getString("reason");
            let staff = interaction.user.displayName

            let userInv = new Discord.EmbedBuilder()
            .setColor('Red')
            .setTitle("Ban Failed")
            .setDescription(`**Invalid User | Please insert a valid User.**`)
            .setTimestamp(new Date());
            if (!member)
                return interaction.reply({ embeds: [userInv], ephemeral: true });

            let banreply = new Discord.EmbedBuilder()
                .setColor('Red')
                .setTitle(`**New Ban**`)
                .setDescription(`**${member} was banned successfully \n Reason: ${reason}**`)
                .setFooter({ text: `Responsible: ${staff}`, iconURL: interaction.user.displayAvatarURL({ format: "png" }) })
                .setTimestamp(new Date())


            let errban = new Discord.EmbedBuilder()
                .setColor('DarkRed')
                .setTitle('Ban Failed')
                .setDescription(`Error while banning ${member.user}`)
                .setTimestamp(new Date());


            try {
                if(!member){
                    return;
                } else {



              
                if(member.bot){
                    interaction.guild.bans.create(member, {reason});
                    interaction.reply({ embeds: [banreply], ephemeral: true })
                } else {
                    setTimeout(() => {
                        interaction.guild.bans.create(member, {reason});
                        interaction.reply({ embeds: [banreply], ephemeral: true })
    
                    }, 1000);
                }
            }

        }

        catch (err) {
            if (err) {
                interaction.reply({ embeds: [errban], ephemeral: true });
            }
        }

        }
    }
}