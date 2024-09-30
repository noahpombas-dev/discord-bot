const Discord = require("discord.js");

module.exports = {
    name: "move-user",
    description: "[ 🧹 Mover Members ] Move a member from a voice channel to another.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "The new Channel you want to move the User.",
            channelTypes: [
                Discord.ChannelType.GuildVoice
            ],
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: "member",
            description: "Choose a member",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.MoveMembers))
            return interaction.reply({ content: `**Error: Permission Denied!**`, ephemeral: true })


        let channel = interaction.options.getChannel("channel")
        let user = interaction.options.getUser("member")
        let member = interaction.guild.members.cache.get(user.id)

        if (!member)
            return interaction.reply({ content: `**Error: Member not found**`, ephemeral: true })


        if (!member.voice.channel)
            return interaction.reply({ content: `**Error: This member is not in a voice channel**`, ephemeral: true })


        try {

            await interaction.deferReply({})

            let embedVoice = new Discord.EmbedBuilder()
                .setAuthor({ name: `Admin: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setColor("Green")
                .setFooter({ text: `Member moved: ${member.user.username}`, iconURL: member.user.displayAvatarURL() })
                .setTimestamp()
                .setTitle("🧹 - Member Moved!")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true, extension: 'png' }))
                .setFields(
                    {
                        name: "🎙 - Voice Channel:",
                        value: `*${channel}*`,
                        inline: true
                    },
                    {
                        name: "🆔 - Voice Chanel ID:",
                        value: `*${channel.id}*`,
                        inline: true
                    },
                    {
                        name: " ",
                        value: ` `,
                        inline: false
                    },
                    {
                        name: "👤 - Moved Member:",
                        value: `*${member}*`,
                        inline: true
                    },
                    {
                        name: "🆔 - Moved member ID:",
                        value: `*${member.id}*`,
                        inline: true
                    }
                )

            await interaction.editReply({ embeds: [embedVoice] })
            member.voice.setChannel(channel)

        } catch (err) {
            interaction.editReply({ content: `**Error: Something didn't work...** ${err}`, ephemeral: true })
        }


    }
}