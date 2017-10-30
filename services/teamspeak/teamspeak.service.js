const { Client } = require('teamspeak');

module.exports = () => {

    const ops = {
        login: ["login", { client_login_name: "danielo", client_login_password: "rmBcyoyG" }],
        use: ["use", { sid: "1" }],
        clientlist: ["clientlist", ['-away', '-voice']]
    };

    let connect = () => new Client("containertsn1.swissteamspeak.org", 11014);

    let query = (select, fn, ts3) => {

        ts3.authenticate(ops.login[0].client_login_name, ops.login[1].client_login_password)
            .then(() => ts3.send(ops.use[0], ops.use[1].sid)) //Use virtual server with ID=1
            .then(() => ts3.send(ops.clientlist[0], ops.clientlist[1]))
            .then(clients => fn(clients, true))
            .catch(error => {
                console.log(error, 'On auth');
                return fn(null, false);
            })
    }

    return {
        connect: connect,
        getClientList: (fn, ts3) => query(ops.clientlist, fn, ts3)
    }
}