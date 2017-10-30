const service = require('./teamspeak.service')();


module.exports = () => {
    let msgErr = "Le query verso questo server teamspeak sono limitate... Riprova tra un po'";
    let modelViewClientList = (reply) => (response, bool) => {
        let str = ""
        if (bool) {
            str = "👀 Guardo su Teamspeak... Adesso online ci sono: \n\n";
            
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
            connect: service.connect
        }
    }