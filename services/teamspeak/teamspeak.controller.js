const service = require('./teamspeak.service')();


module.exports = () => {
    let msgErr = "Le query verso questo server teamspeak sono limitate... Riprova tra un po'";
    let modelViewClientList = (reply) => (response, bool) => {
        let str = ""
        if (bool) {
            str = "👀 Guardo su Teamspeak... Adesso online ci sono: \n\n";
            
            try {
                response.client_nickname.forEach(function (r, i) {
                    if (response.client_type[i] != 1) {
                        str += '👉🏼 ' + response.client_nickname[i] + ' ';
                        if (response.client_input_muted[i] == "1")
                            str += '🙊'
                        if (response.client_output_muted[i] == "1")
                            str += '🙉'
                        str += '\n'
                    }
                });
            }
            catch (err) {
                console.log(err);
                str += 'Non c\'è nessuno.';
            }
        }

        else str+= "😭😭😭 Le query verso questo server teamspeak sono limitate... Riprova tra un po";


            reply(str);
        }

        let showClients = (reply, ts3) => service.getClientList(modelViewClientList(reply), ts3)

        return {
            showClients: showClients,
            turnOnClientListener: service.turnOnClientListener,
            connect: service.connect
        }
    }