const service = require('./teamspeak.service')();


module.exports = () => {

    let modelViewClientList = (reply) => (response) => {
        let str = "👀 Guardo su Teamspeak... Adesso online ci sono: \n\n";
        try {
            response.forEach(function (r) {
                if (r.client_type != 1) {
                    str += '👉🏼 ' + r.client_nickname + ' ';
                    if (r.client_input_muted)
                        str += '🙊'
                    if (r.client_output_muted)
                        str += '🙉'
                    str += '\n'
                }
            });
        }
        catch(err) {
            console.log(err);
            str += 'Non c\'è nessuno.';
        }

    reply(str);
}

let showClients = (reply) => service.getClientList(modelViewClientList(reply))

return {
    showClients: showClients
}
}