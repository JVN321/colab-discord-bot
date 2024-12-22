
import { CommandInteraction } from 'discord.js';

export const data = {
    name: 'ping',
    description: 'Replies with Pong!',
};

export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Pong!');
}