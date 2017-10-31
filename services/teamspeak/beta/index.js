/* If using Babel, you can of course import it instead */
const TeamSpeakClient = require('teamspeak-async').TeamSpeakClient
const client = new TeamSpeakClient(
    { 
        host: 'containertsn1.swissteamspeak.org', 
        port: 11014,
        user: 'danielo',
        password: 'rmBcyoyG',
        server: "1"
    });

    async function getClientNames(){
        let clients = await client.send('clientlist')
        console.log(clients)
        return clients.map(client => client.client_nickname)
    }
    
    /* Print names of everyone online */
    getClientNames()
      .then(names => {
          console.log(names)
        names.map(name => console.log(name))
      })
    
    /* Make everyone online hate you */
    client.send('clientlist').then(clients => {
      clients.map(user => client.send('clientpoke', {clid:user.clid, msg:`Hello ${user.client_nickname}`}))
    })