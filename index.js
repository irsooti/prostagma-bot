const Telegraf = require('telegraf');

try {
    const dotenv = require('dotenv');
    dotenv.load();
} catch (error) {
    console.log('dotenv can\'t be loaded... SKIPPED');
}

// const TeamspeakConfig = require('./services/teamspeak/teamspeak.controller')();
// let ts3 = TeamspeakConfig.connect();

// ts3.on('error', error => {
//     console.log(error, 'On initialize, retrying');
//     // ts3 = TeamspeakConfig.connect();
// });


const TrelloConfig = require('./services/trello/trello.controller')();
const RLConfig = require('./services/rocketleague/rocketleague.controller')();
const rocketLeagueToken = RLConfig.connect(process.env.ROCKET_TOKEN);

const app = new Telegraf(process.env.BOT_TOKEN)
app.command('start', ({ from, reply }) => {
    console.log('start', from);
    return reply('Corvo?!')
});

app.hears(/prostagma/, (ctx) => ctx.reply(`Ciao ${ctx.message.from.username}, sei una faccia di culo!`));
// app.command('/ts', ({ reply }) => TeamspeakConfig.showClients(reply, ts3));
app.command('/suggerisco', (ctx) => {
    let msg = ctx.message.text.split('/suggerisco')[1];
    TrelloConfig.postSuggestion(msg, ctx.message.from.username);
    return ctx.reply('Grazie del suggerimento... CRETINO!')
});
app.hears(/link ts/, (ctx) => ctx.reply('Il link Teamspeak: \n\nhttp://www.teamspeak.com/invite/7003.ts.swissteamspeak.org/?password=disperati1'))

// app.command('/test', (ctx) => {
//     return TeamspeakConfig.turnOnClientListener(ctx.reply, ts3);
// })

app.command('/test', (ctx) => {
    let msg = ctx.message.text.split('/test ')[1];
    RLConfig.showUser(msg, ctx.replyWithPhoto, rocketLeagueToken)
});
app.startWebhook('/prostagma-dir', null, process.env.PORT)
app.startPolling();