// index.js

// Import required modules
const Discord = require('discord.js');
const express = require('express');
const { Client, Intents } = require('discord.js');
const { Sequelize } = require('sequelize');
const { token, prefix } = require('./config.json');
const { moderationCommands, filterMessages, reportViolation, setPermissions } = require('./commands');
const { connectToDatabase } = require('./core/database');
const { startBot } = require('./core/bot');

// Initialize Discord bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Initialize Express app for the dashboard
const app = express();

// Connect to the database
connectToDatabase(Sequelize);

// Set up bot commands
client.once('ready', () => {
  console.log('Bot is ready');
  startBot(client, moderationCommands, filterMessages, reportViolation, setPermissions);
});

// Handle incoming messages
client.on('messageCreate', (message) => {
  if (message.content === `${prefix}ping`) {
    message.reply('Pong!');
  }
});

// Log in to Discord with bot token
client.login(token);

// Start Express server for the dashboard
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Dashboard is running on http://localhost:${PORT}`);
});