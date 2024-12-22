
import { Client } from 'discord.js';
import config from './config';
import * as commandModules from './commands';
import "./keep_alive";

const commands = Object(commandModules);


const client = new Client({
    intents: ["Guilds", "GuildMessages","GuildMembers","MessageContent"]
});

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.username}`);
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const {commandName} = interaction;
    commands[commandName].execute(interaction, client);
})


client.login(config.DISCORD_TOKEN);