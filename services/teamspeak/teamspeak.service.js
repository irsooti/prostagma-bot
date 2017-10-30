const TeamSpeakClient = require('node-teamspeak');

module.exports = () => {
    const cl = new TeamSpeakClient("containertsn1.swissteamspeak.org", 11014);
    const ops = {
        login: ["login", { client_login_name: "danielo", client_login_password: "rmBcyoyG" }],
        use: ["use", { sid: 1 }],
        clientlist: ["clientlist", ['away', 'voice', 'times', 'uid', 'groups', 'info', 'icon', 'country']]
    };

    let connect = (select, fn) => {
        return cl.send(ops.login[0], ops.login[1], (err, response, rawResponse) => {
            return cl.send(ops.use[0], ops.use[1], (err, response, rawResponse) => {
                return cl.send(select[0], select[1], (err, response, rawResponse) => {
                    return fn(response)
                });
            });
        });
    }

    return {
        getClientList: (fn, reply) => connect(ops.clientlist, fn)
    }
}