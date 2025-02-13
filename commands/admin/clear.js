const Discord = require("discord.js");
module.exports = {
    name: 'clear',
    description: '[ 🧹 Clear ] Delete 1-100 Messages',
    options: [
        {
            name: "quantity",
            description: "1-100 Number of Messages you want to delete!",
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
    ],

    run: async(client, interaction) => {
        let noPermission = new Discord.EmbedBuilder()
        .setColor('Red')
        .setTitle('Permission Error!')
        .setDescription(`
        **Dicord BOT**

        Access denied for this command!
        
        ${interaction.user}`);

        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) {
            interaction.reply({embeds: [noPermission], ephemeral: true})
        } else {
            let quantity = interaction.options.getString("quantity");

            if(parseInt(quantity) > 100 || parseInt(quantity) <= 0){
                let invalidQuantity = new Discord.EmbedBuilder()
                .setColor('Red')
                .setTitle("Invalid Quantity!")
                .setDescription(`
                **Dicord BOT**
        
                🚫 Please enter a number between 1 and 100! 🚫
                
        
                ${interaction.user}`);

                await interaction.reply({embeds: [invalidQuantity], ephemeral: true})
            } else {
                interaction.channel.bulkDelete(parseInt(quantity))

                if(quantity < 1){
                    const message = "1 message has been successfully deleted!"

                    let clearEmbed = new Discord.EmbedBuilder()
                    .setColor('Green')
                    .setTitle("Message Cleaner")
                    .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`
                    **Dicord BOT**
            
                    ✅ ${message} ✅
                    
            
                    ${interaction.user}`)
                    
                    interaction.reply({embeds: [clearEmbed]});
                } else { 
                    const message = `${quantity} messages have been successfully deleted!`

                    let clearEmbed = new Discord.EmbedBuilder()
                    .setColor('Green')
                    .setTitle("Message Cleaner")
                    .setAuthor({name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                    .setDescription(`
                    **Discord BOT**
            
                    ✅ ${message} ✅
                    
            
                    ${interaction.user}`)
                    
                    interaction.reply({embeds: [clearEmbed]});
                }

                let deleteMessage = "yes"

                if(deleteMessage === "yes"){
                    setTimeout(() => {
                        interaction.deleteReply()
                    }, 2500);
                } else if(deleteMessage === "no"){
                    return;
                }
            }
        }
    }
}
