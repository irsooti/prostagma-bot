const Telegraf = require('telegraf');


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
const app = new Telegraf(process.env.BOT_TOKEN);

const bot = require('./bot/bot')();
bot.start(app, services);

