module.exports = () => {
    let start = (app, Markup, service) => {
        app.command('start', ({ reply }) => {
            return reply('Guarda le tue stats', Markup
                .keyboard([
                    ['⚽️ Rocket League'], // Row1 with 2 buttons
                ])
                .oneTime()
                .resize()
                .extra()
            )
        });

        app.hears(/prostagma/, (ctx) => ctx.reply(`Ciao ${ctx.message.from.username}, sei una faccia di culo!`));
        // app.command('/ts', ({ reply }) => TeamspeakConfig.showClients(reply, ts3));
        app.command('/suggerisco', (ctx) => {
            let msg = ctx.message.text.split('/suggerisco')[1];
            service.TrelloConfig.postSuggestion(msg, ctx.message.from.username);
            return ctx.reply('Grazie del suggerimento... CRETINO!')
        });
        app.hears(/link ts/, (ctx) => ctx.reply('Il link Teamspeak: \n\nhttp://www.teamspeak.com/invite/7003.ts.swissteamspeak.org/?password=disperati1'))

        app.command('/registrami', (ctx) => {
            service.Database.addUser(ctx.message.from.id, ctx.message.from.username, ctx.message.from.first_name, ctx.reply, console.log);
        })

        app.command('/rls', (ctx) => {
            let msg = ctx.message.text.split('/rls ')[1];
            service.RLConfig.showUser(msg, ctx.replyWithPhoto)
        });

        app.hears('⚽️ Rocket League', (ctx) => {
            service.Database.getUser(ctx.message.from.id, service.RLConfig.showUser, ctx.replyWithPhoto)
        });

        app.startPolling();
    }

    return {
        start: start
    }
}
