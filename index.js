﻿const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');

try {
    const dotenv = require('dotenv');
    dotenv.load();
} catch (error) {
    console.log('dotenv can\'t be loaded... SKIPPED');
}

const services = {
    TrelloConfig: require('./services/trello/trello.controller')(),
    RLConfig: require('./services/rocketleague/rocketleague.controller')(process.env.ROCKET_TOKEN),
    Database: require('./services/mongo/mongo.controller')(process.env.MONGO_HOST, process.env.MONG_DB),
}

// Startup Database
services.Database.connect(true);

const app = new Telegraf(process.env.BOT_TOKEN);

const bot = require('./bot/bot')();
bot.start(app, Markup, services);

