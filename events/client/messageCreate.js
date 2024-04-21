module.exports = {
    name: 'messageCreate',

    /**
     * @param {Message} message 
     * @param {Client} client 
     */
    async execute(message, client) {
        if (message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(client.config.botPrefix)) return;
        const [cmd, ...args] = message.content.slice(client.config.botPrefix.length).trim().split(" ");
        const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

        //Se quiser que o bot não retorne nada caso o comando não existe
        //if (!command) { return }

        //Se quiser que o bot retorne alguma mensagem
        if (!command) {
            return message.reply({ content: `:x: **|** Comando não encontrado` })
        }

        //Se quiser que o bot não retorne nada ao usar um comando apenas para dev
        /*if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) { return }
        }*/

        //se quiser que o bot retorne alguma mensagem
        if (command.ownerOnly) {
            if (message.author.id !== client.config.ownerID) {
                return message.reply({ content: `:x: **|** Apenas meu criador pode usar esse comando!` })
            }
        }

        await command.run(client, message, args);
    }
}