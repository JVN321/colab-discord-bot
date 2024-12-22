// src/commands/ping.ts
import { CommandInteraction } from 'discord.js';

export const data = {
    name: 'help',
    description: 'help meee',
};

export async function execute(interaction: CommandInteraction) {
    await interaction.reply('helping');
}