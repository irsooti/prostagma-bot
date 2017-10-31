const Bot = require('cmr1-ts3-bot');

// Create a new bot with desired configuration (these are the default values)
const bot = new Bot({
  sid: 1,
  name: 'Gurzos',
  user: 'danielo',
  pass: 'rmBcyoyG',
  host: 'containertsn1.swissteamspeak.org',
  port: 11014,
  channel: 'Riformatorio',
  verbose: true
});

// Initialize the bot (callback is optional)
bot.init((err) => {
  if (err) console.log(err) // Something didn't work
  else console.log('hello')   // The bot is alive!
});

// Listen for the bot's "ready" event (emitted after succesfull "init")
bot.on('ready', () => {
  // Send a message to the TS3 main server chat
  bot.server.message('Ready for service');
});

// Listen for the bot's "join" event (the bot will automatically join the channel specified)
bot.on('join', channel => {
  // Send a message to the channel that the bot has now joined
  channel.message('I have joined this channel!');
});

// Register a command for this bot that can be invoked in the channel chat
bot.channelCommand('ping', (args, context) => {
  // When someone says "ping" in the bot's channel, reply to that channel with "pong"
  bot.channel.message('pong');
});