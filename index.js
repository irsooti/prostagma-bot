const Telegraf = require('telegraf');
const Rollbar = require("rollbar");

try {
    const dotenv = require('dotenv');
    dotenv.load();
} catch (error) {
    console.log('dotenv can\'t be loaded... SKIPPED');
}

const rollbar = new Rollbar(process.env.ROLLBAR_TOKEN);
rollbar.log("Server started");
const TeamspeakConfig = require('./services/teamspeak/teamspeak.controller')();
let ts3 = TeamspeakConfig.connect();

ts3.on('error', error => {
    console.log(error, 'On initialize, retrying');
    ts3 = TeamspeakConfig.connect();
});

const TrelloConfig = require('./services/trello/trello.controller')();

const app = new Telegraf(process.env.BOT_TOKEN)
app.command('start', ({ from, reply }) => {
    console.log('start', from);
    rollbar.log("Has started bot", from);
    return reply('Corvo?!')
});

app.hears(/prostagma/, (ctx) => ctx.reply(`Ciao ${ctx.message.from.username}, sei una faccia di culo!`));
app.command('/ts', ({ reply }) => TeamspeakConfig.showClients(reply, ts3));
app.command('/suggerisco', (ctx) => {
    let msg = ctx.message.text.split('/suggerisco')[1];
    TrelloConfig.postSuggestion(msg, ctx.message.from.username);
    return ctx.reply('Grazie del suggerimento... CRETINO!')
});
app.hears(/link ts/, (ctx) => ctx.reply('Il link Teamspeak: \n\nhttp://www.teamspeak.com/invite/7003.ts.swissteamspeak.org/?password=disperati1'))
app.options = {
    port: process.env.PORT || 5000   
}
app.startPolling();