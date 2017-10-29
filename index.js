const Telegraf = require('telegraf');
const dotenv = require('dotenv');
dotenv.load();
const util = require("util");

const TeamspeakConfig = require('./services/teamspeak/teamspeak.controller')();


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
app.startPolling()
// const Telegraf = require('telegraf')
// const { reply } = Telegraf

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.command('/oldschool', (ctx) => ctx.reply('Hello'))

// bot.command('/hipster', reply('λ'))
// bot.startPolling()