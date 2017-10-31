const TeamspeakQuery = require('teamspeak-query');

module.exports = () => {

    const ops = {
        login: ["login", { client_login_name: "danielo", client_login_password: "rmBcyoyG" }],
        use: ["use", { sid: "1" }],
        clientlist: ["clientlist", ['-away', '-voice']]
    };

    let connect = () => new TeamspeakQuery('containertsn1.swissteamspeak.org', 11014);
    let count = 0;
    let noFlood = () => {

        if (count == 3) {
            console.log('Flooding!!!')
            return false;
        }

        if (count > 0) {
            setTimeout(() => {
                count--
            }, 40000)
        }

        count++;
        return true;
    }
    let turnOnClientListener = (fn, ts3) => {
        let clientListener = false;

        ts3.send('login', 'danielo', 'rmBcyoyG')
            .then(() => ts3.send('use', 1))
            .then(() => ts3.send('servernotifyregister', { 'event': 'server' }))
            .then(() => console.log('Done! Everything went fine'))
            .catch(err => console.error('An error occured:', err));

        if (!clientListener)
            ts3.on('cliententerview', data => {
                console.log(data);
                let clientListener = true;
                return fn(data.client_nickname + 'si è connesso su ts');
            });


    }

    let getClientList = (select, fn, ts3) => {
        if (noFlood()) {
            console.log(count)
            console.log('requesting....')
            ts3.send('login', 'danielo', 'rmBcyoyG')
                .then(() => ts3.send('use', 1))
                .then(() => ts3.send('clientlist', '-voice'))
                .then((r) => fn(r, true))
                .catch(err => {
                    console.error('An error occured:', err);
                    return fn(null, false)
                });
        }

        else fn(null, false)
    }

    return {
        connect: connect,
        getClientList: (fn, ts3) => getClientList(ops.clientlist, fn, ts3),
        turnOnClientListener: (fn, ts3) => turnOnClientListener(fn, ts3)
    }
}