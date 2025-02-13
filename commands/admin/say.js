const Discord = require("discord.js");
module.exports = {
    name: 'say',
    description: '[ 💭 Say ] Send a message in an Embed',
    options: [
        {
            name: "channel",
            description: "Select the channel where you want to send the Embed message!",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildText,
                Discord.ChannelType.GuildAnnouncement,
            ],
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
            let channel = await interaction.options.getChannel("channel");

            // Modal
            const modal = new Discord.ModalBuilder()
            .setCustomId("modalsay")
            .setTitle("Embed Say")

            // Modal: Create Inputs
            const titleInput = new Discord.TextInputBuilder()
            .setCustomId("titleInput") 
            .setLabel("Embed Title") 
            .setStyle(Discord.TextInputStyle.Short) 

            const descriptionInput = new Discord.TextInputBuilder()
            .setCustomId("descriptionInput") 
            .setLabel("Embed Description") 
            .setStyle(Discord.TextInputStyle.Paragraph) 
            .setRequired()

            const colorInput = new Discord.TextInputBuilder()
            .setCustomId("colorInput") 
            .setLabel("Embed Color") 
            .setStyle(Discord.TextInputStyle.Short)

            // Modal: Add Inputs to Modal
            const titleRow = new Discord.ActionRowBuilder().addComponents(titleInput)
            const descriptionRow = new Discord.ActionRowBuilder().addComponents(descriptionInput)
            const colorRow = new Discord.ActionRowBuilder().addComponents(colorInput)

            modal.addComponents(titleRow, descriptionRow, colorRow)

            await interaction.showModal(modal)
            
            client.once("interactionCreate", async (interaction) => {
                if(!interaction.isModalSubmit()) return;
                if (interaction.customId === 'modalsay') {

                    // SEND MODAL
                    const titleEmbed = interaction.fields.getTextInputValue("titleInput")
                    const descriptionEmbed = interaction.fields.getTextInputValue("descriptionInput")
                    const colorEmbed = interaction.fields.getTextInputValue("colorInput")
    
                        const embed = new Discord.EmbedBuilder()
                        .setColor(`${colorEmbed}`)
                        .setTitle(`${titleEmbed}`)
                        .setDescription(`${descriptionEmbed}`)
                        .setThumbnail(interaction.guild.iconURL())
                        .setTimestamp()
                        .setFooter({text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL()}`});
        
                        await channel.send({embeds: [embed]});
                        await interaction.reply({content: `Message successfully sent! ${channel}`, ephemeral: true});

                        // END SEND MODAL
                }
            })
        }
    }
}
