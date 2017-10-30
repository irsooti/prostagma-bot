const Telegraf = require('telegraf');
// Start the Opbeat agent before any thing else in your app
var opbeat = require('opbeat').start();

try {
    const dotenv = require('dotenv');
    dotenv.load();
} catch (error) {
    console.log('dotenv can\'t be loaded... SKIPPED');
}

const TeamspeakConfig = require('./services/teamspeak/teamspeak.controller')();
const TrelloConfig = require('./services/trello/trello.controller')();


const app = new Telegraf(process.env.BOT_TOKEN)
app.command('start', ({ from, reply }) => {
    console.log('start', from)
    return reply('Corvo?!')
});

app.hears(/prostagma/, (ctx) => {
    return ctx.reply(`Ciao ${ctx.message.from.username}, sei una faccia di culo!`)
})

app.on('sticker', (ctx) => ctx.reply('👍'))
app.command('/ts', ({ reply }) => TeamspeakConfig.showClients(reply));
app.command('/suggerisco', (ctx) => {
    let msg = ctx.message.text.split('/suggerisco')[1];
    TrelloConfig.postSuggestion(msg, ctx.message.from.username);
    return ctx.reply('Grazie del suggerimento... CRETINO!')
});
app.hears(/link ts/, (ctx) => ctx.reply('Il link Teamspeak: \n\nhttp://www.teamspeak.com/invite/7003.ts.swissteamspeak.org/?password=disperati1'))

app.startPolling()
// const Telegraf = require('telegraf')
// const { reply } = Telegraf

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.command('/oldschool', (ctx) => ctx.reply('Hello'))

// bot.command('/hipster', reply('λ'))
// bot.startPolling()