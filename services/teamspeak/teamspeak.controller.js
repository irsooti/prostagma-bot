const service = require('./teamspeak.service')();


module.exports = () => {
    
    let modelViewClientList = (reply) => (response) => {
        let str = "👀 Guardo su Teamspeak... Adesso online ci sono: \n\n";
        response.forEach(function (r) {
            if (r.client_type != 1) {
                str += '👉🏼 ' + r.client_nickname + ' ';
                if (r.client_input_muted)
                    str += '🙊'
                if (r.client_output_muted)
                    str += '🙉'
                str += '\n'
            }
        }, this);

        reply(str);
    }

    let showClients = (reply) => service.getClientList(modelViewClientList(reply))

    return {
        showClients: showClients
    }
}