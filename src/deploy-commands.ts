// src/registerCommands.ts
import { REST, Routes, SharedSlashCommand, SlashCommandBuilder } from "discord.js";
import config from "./config";
import * as commandModules from "./commands";

const commands = [];

for (const module of Object.values(commandModules)) {
  
    commands.push(new SlashCommandBuilder().setName(module.data.name).setDescription(module.data.description));

}

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), { body: commands })
  .then(() => {
    console.log("Successfully registered application commands.");
  })
  .catch(console.error);
