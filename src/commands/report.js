// report.js

const { Client, Intents, MessageEmbed } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
  console.log('Bot is ready to report violations.');
});

client.on('messageCreate', async (message) => {
  if (message.content.startsWith('!report')) {
    const user = message.mentions.users.first();
    const reason = message.content.slice(8).trim();

    if (!user) {
      return message.reply('Please mention a user to report.');
    }

    if (!reason) {
      return message.reply('Please provide a reason for the report.');
    }

    const reportEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('User Report')
      .addField('Reported User', user)
      .addField('Reason', reason)
      .setTimestamp();

    const channel = message.guild.channels.cache.find((ch) => ch.name === 'reports');
    if (!channel) {
      return message.reply('Could not find a reports channel.');
    }

    channel.send({ embeds: [reportEmbed] });
    message.reply('User reported successfully.');
  }
});

client.login('your-token-goes-here');