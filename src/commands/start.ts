import { CommandInteraction } from 'discord.js';
import { startSelenium, stopSelenium } from '../startSelenium';

export const data = {
    name: 'start',
    description: 'To start server',
};

export async function execute(interaction: CommandInteraction) {
    await interaction.reply('Starting server...');
    await startSelenium();
    return
    try {
        await stopSelenium();
        
        await interaction.followUp('Server started, the bot should come online shortly.');
    } catch (error) {
        console.error('Error starting server:', error);
        await interaction.followUp('There was an error starting the server.');
    }
}