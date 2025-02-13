const Discord = require("discord.js");

module.exports = {
    name: "move-user",
    description: "[ 🧹 Move Members ] Moves a member from one voice channel to another.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "channel",
            description: "Choose a voice channel.",
            channelTypes: [
                Discord.ChannelType.GuildVoice
            ],
            type: Discord.ApplicationCommandOptionType.Channel,
            required: false,
        },
        {
            name: "member",
            description: "Choose a member",
            type: Discord.ApplicationCommandOptionType.User,
            required: false,
        },
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.MoveMembers))
            return interaction.reply({ content: `**❌ - You do not have permission to use this command!**`, ephemeral: true })


        let user = interaction.options.getUser("member")
        let voiceChannel = interaction.options.getChannel("channel")
        if (!user) user = interaction.user
        if (!voiceChannel) voiceChannel = interaction.member.voice.channel
        let member = interaction.guild.members.cache.get(user.id)

        if (!member)
            return interaction.reply({ content: `**❌ - I couldn't find this member, please try again!**`, ephemeral: true })


        if (!member.voice.channel)
            return interaction.reply({ content: `**❌ - This member is not in a voice channel!**`, ephemeral: true })


        try {

            await interaction.deferReply({})

            let embedVoice = new Discord.EmbedBuilder()
                .setAuthor({ name: `Requested by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
                .setColor("Green")
                .setFooter({ text: `Member moved: ${member.user.username}`, iconURL: member.user.displayAvatarURL() })
                .setTimestamp()
                .setURL(`https://discord.com/channels/${interaction.guild.id}/${voiceChannel.id}`)
                .setTitle("🧹 - Member Moved!")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true, extension: 'png' }))
                .setDescription("*✅ - The member was successfully moved!*")
                .setFields(
                    {
                        name: "🎙 - Voice Channel:",
                        value: `*${voiceChannel}*`,
                        inline: true
                    },
                    {
                        name: "🆔 - Voice Channel ID:",
                        value: `*${voiceChannel.id}*`,
                        inline: true
                    },
                    {
                        name: "👤 - Moved Member:",
                        value: `*${member}*`,
                        inline: true
                    },
                    {
                        name: "🆔 - Moved Member ID:",
                        value: `*${member.id}*`,
                        inline: true
                    }
                )

            await interaction.editReply({ embeds: [embedVoice] })
            member.voice.setChannel(voiceChannel)

        } catch {
            interaction.editReply({ content: `**❌ - Something went wrong...**`, ephemeral: true })
        }
    }
}
