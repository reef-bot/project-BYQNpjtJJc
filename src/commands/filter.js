// File: src/commands/filter.js

const { Client } = require('discord.js');

const client = new Client();

// Function to filter inappropriate messages
client.on('message', (message) => {
  // Check if the message contains any inappropriate content
  if (message.content.includes('inappropriate_word')) {
    // Delete the message
    message.delete();
    // Send a warning to the user
    message.author.send('Please refrain from using inappropriate language.');
    // Log the action
    console.log(`Message from ${message.author.tag} deleted for inappropriate content: ${message.content}`);
  }
});

client.login('your_bot_token');