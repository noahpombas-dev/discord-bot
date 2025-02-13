const fs = require("node:fs");
const chalk = require("chalk");

// Load Events
const loadEvents = async function (client) {
    const eventFolders = fs.readdirSync("./events");
    for (const folder of eventFolders) {
        const eventFiles = fs
            .readdirSync(`./events/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../events/${folder}/${file}`);

            if(event.name) {
                console.log(chalk.greenBright(`✅ => ${file} Event loaded.`));
            } else {
                console.log(chalk.redBright(`❌ => ${file} Event not loaded.`))
                continue;
            }

            if(event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
}

// Load Slashcommands
const loadSlashCommands = async function (client) {
    let slash = [];

    const commandFolders = fs.readdirSync("./commands")
    for (const folder of commandFolders) {
        const commandFiles = fs
            .readdirSync(`./commands/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const command = require(`../commands/${folder}/${file}`);

            if(command.name) {
                client.slash.set(command.name, command);
                slash.push(command);
                console.log(chalk.greenBright(`✅ => ${file} Slashcommand loaded.`))
            } else {
                console.log(chalk.redBright(`❌ => ${file} Slashcommand not loaded.`))
                continue;
            }

        }
    }

    client.on("ready", async () => {
        await client.application.commands.set(slash);
    })
}

module.exports = {
    loadEvents,
    loadSlashCommands
}