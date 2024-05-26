// File: src/core/bot.js

// Import necessary packages
const { Client, Intents } = require('discord.js');
const config = require('../../config.json');
const moderationCommands = require('../commands/moderation');
const filter = require('../commands/filter');
const report = require('../commands/report');
const permissions = require('../commands/permissions');

// Create a new Discord client
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Event listener when the bot is ready
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for new messages
client.on('messageCreate', async (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Pass the message to the filter for inappropriate content check
    filter.checkMessage(message);

    // Check if the message is a command and execute appropriate moderation command
    if (message.content.startsWith(config.prefix)) {
        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'mute') {
            moderationCommands.muteUser(message, args);
        } else if (command === 'kick') {
            moderationCommands.kickUser(message, args);
        } else if (command === 'ban') {
            moderationCommands.banUser(message, args);
        } else if (command === 'warn') {
            moderationCommands.warnUser(message, args);
        }
    }
});

// Log in to Discord with your app's token
client.login(config.token);

// Export the client for use in other files
module.exports = client;